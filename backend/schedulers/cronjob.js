const client = require("../database/setup.js")
const cron = require("node-cron")
const url = "https://fbref.com/en/comps/9/schedule/Premier-League-Scores-and-Fixtures"
const fs = require("fs")
const path = require("path")
const axios = require("axios")
const cheerio = require("cheerio")
const aliases = { 
    "Manchester United": ["man united", "man u", "manchester utd"],
    "Newcastle United": ["newcastle", "newcastle utd"],
    "Nottingham Forest": ["nott'ham forest", "nottingham"]
}

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
};
const filePath = path.join(__dirname, "premier_league_scores.html")
const start = "2025-08-11"
const end = "2025-08-17"

const correctedName = {}
for(const [trueName, aliasList] of Object.entries(aliases)) {
    correctedName[trueName.toLowerCase()] = trueName
    for(const alias of aliasList) {
        correctedName[alias.toLowerCase()] = trueName
    }
}
function formatTeam (teamName) {
    const corrected = teamName.toLowerCase().trim()
    return correctedName[corrected] || teamName.trim()
}

async function fetchAndSavePage() {
    try {
        const response = await axios.get(url, { headers })
        fs.writeFileSync(filePath, response.data)
        console.log("Page saved locally!")
    } catch (err) {
        console.error("Error fetching page:", err)
    }
}

async function updateXG() {
    const weeklyMatches = await client.db("database").collection("matches").find({
        date: {
            $gte: "2025-08-11",
            $lte: "2025-08-17"
        }, $or: [{homeXG: NaN, awayXG: NaN}]
    }).toArray()
    if(weeklyMatches.length > 0) {
        const HTML = fs.readFileSync(filePath, "utf-8")
        const $ = cheerio.load(HTML);
        const scraped = []
        $("td.left[data-stat='date']").each((index, element) => {
            const rawHomeTeam = $(element).closest("tr").find("td.right[data-stat='home_team'] a").text().trim()
            const homeXG = parseFloat($(element).closest("tr").find("td.right[data-stat='home_xg']").text().trim())
            const rawAwayTeam = $(element).closest("tr").find("td.left[data-stat='away_team'] a").text().trim()
            const awayXG = parseFloat($(element).closest("tr").find("td.right[data-stat='away_xg']").text().trim())
    
            if(!isNaN(homeXG) && !isNaN(awayXG)) {
                scraped.push({
                    home: formatTeam(rawHomeTeam),
                    away: formatTeam(rawAwayTeam),
                    homeXG,
                    awayXG
                })
            }
        })
        for (const match of weeklyMatches) {
            const matched = scraped.find(m => 
                m.home === match.home && m.away === match.away
            )
            if(matched) {
                console.log(`UPDATING ${match._id} WITH VALUES: ${matched.homeXG} , ${matched.awayXG}`)
                await client.db("database").collection("matches").updateOne(
                    {_id: match._id},
                    {
                        $set: {
                            homeXG: matched.homeXG,
                            awayXG: matched.awayXG
                        }
                    }
                )
            }
        }
    } else {
        console.log("NO MATCHES TO UPDATE")
    }
}

cron.schedule("0 */30 * * * *", () => {
    console.log("PERFORMING TASKS")
    updateXG()
})