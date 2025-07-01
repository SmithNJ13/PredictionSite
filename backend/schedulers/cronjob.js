const client = require("../database/setup.js")
const cron = require("node-cron")
const url = "https://fbref.com/en/comps/9/schedule/Premier-League-Scores-and-Fixtures"
const axios = require("axios")
const cheerio = require("cheerio")
const premierLeagueMatches = [];

const fetchMatches = () => {
    premierLeagueMatches.length = 0
    axios(url)
    .then(response => {
            const HTML = response.data;
            const $ = cheerio.load(HTML);
    
            $("td.left[data-stat='date']").each((index, element) => {
                const date = $(element).find("a").text().trim()
                if(date) {
                    const matchTime = $(element).closest("tr").find("td.right[data-stat='start_time']").text().trim()
                    const homeTeam = $(element).closest("tr").find("td.right[data-stat='home_team'] a").text().trim()
                    const homeXGS = $(element).closest("tr").find("td.right[data-stat='home_xg']").text().trim()
                    const awayXGS = $(element).closest("tr").find("td.right[data-stat='away_xg']").text().trim()
                    const awayTeam = $(element).closest("tr").find("td.left[data-stat='away_team'] a").text().trim()
    
                    const homeXG = parseFloat(homeXGS)
                    const awayXG = parseFloat(awayXGS)
    
                    const matchInfo = {
                        date: date,
                        time: matchTime,
                        home: homeTeam,
                        homeXG: homeXG,
                        away: awayTeam,
                        awayXG: awayXG
                    }
                    premierLeagueMatches.push(matchInfo)
                }
            })
            console.log(premierLeagueMatches.length)
            seedDB(premierLeagueMatches)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    const seedDB = async (matchesArray) => {
        try {
            await client.connect();
            await client.db("database").collection("matches").drop();
    
            let ID = 1;
            for (const match of matchesArray) {
                try {
                    await client.db("database").collection("matches").insertOne({
                        _id: ID,
                        date: match.date,
                        time: match.time,
                        home: match.home,
                        homeXG: match.homeXG,
                        away: match.away,
                        awayXG: match.awayXG
                    });
                    ID++;
                } catch (insertError) {
                    if (insertError.code !== 11000) {
                        console.error('Error inserting match:', insertError);
                    } else {
                    }
                }
            }
            console.log("MATCHES SEEDED!")
            await client.close();
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    };
}  
cron.schedule("0 * * * *", () => {
    console.log("Cron job triggered at: ", new Date())
    fetchMatches()
})