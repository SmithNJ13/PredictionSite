const client = require("../database/setup.js")
const cron = require("node-cron")
const url = "https://fbref.com/en/comps/9/schedule/Premier-League-Scores-and-Fixtures"
const axios = require("axios")
const cheerio = require("cheerio")
const aliases = { 
    "Manchester United": ["man united", "man u", "manchester utd"],
    "Newcastle United": ["newcastle", "newcastle utd"],
    "Nottingham Forest": ["nott'ham forest", "nottingham"]
}

const start = "2025-08-11";
const end = "2025-08-17";


async function updateXG() {
    const weeklyMatches = await client.db("database").collection("matches").find({
        date: {
            $gte: "2025-08-11",
            $lte: "2025-08-17"
        }, $or: [{homeXG: NaN, awayXG: NaN}]
    }).toArray()
    axios(url)
    .then(response => {
        const HTML = response.data;
        const $ = cheerio.load(HTML);
        $("td.left[data-stat='date']").each((index, element) => {
            const date = $(element).find("a").text().trim()
            if(date) {
                const homeXGS = $(element).closest("tr").find("td.right[data-stat='home_xg']").text().trim()
                const awayXGS = $(element).closest("tr").find("td.right[data-stat='away_xg']").text().trim()
                const homeXG = parseFloat(homeXGS)
                const awayXG = parseFloat(awayXGS)
                console.log(homeXG, awayXG)
            }
        })
    })
    .catch(error => {
        console.log("Error fetching data", error)
    }) 
}

cron.schedule("0 */30 * * * *", () => {
    console.log("PERFORMING TASKS")
})
// updateXG()