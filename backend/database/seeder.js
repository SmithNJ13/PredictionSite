const client = require("./setup")
const url = "https://fbref.com/en/comps/9/schedule/Premier-League-Scores-and-Fixtures"
const axios = require("axios")
const cheerio = require("cheerio")
const bcrypt = require("bcryptjs") 

const premierLeagueMatches = [];

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
        // console.log(premierLeagueMatches)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

const seedUsers = async () => {
    try{
        await client.connect()
        const rounds = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
        const password = await bcrypt.hash("yxnyy0q854Random", rounds)
        await client.db("database").collection("users").drop()
        await client.db("database").collection("users").insertOne({
            _id: 0,
            username: "RandomBot",
            email: "Random@Email.com",
            password: password
            
        })
        console.log("USERS SEEDED!")
        seedPredictions()
    } catch (error) {
        console.log(error)
    }
}

const seedPredictions = async () => {
    try{
        await client.connect()
        await client.db("database").collection("predictions").drop()
        for(let i = 1; i <= 380; i++) {
            const homeXG = +(Math.random() * 5.6).toFixed(2);
            const awayXG = +(Math.random() * 5.6).toFixed(2);
            await client.db("database").collection("predictions").insertOne({
                    userID: 0,
                    matchID: i,
                    side: {
                        home: {
                            predicted_xG: homeXG,
                            corners: null,
                            playerToScore: null,
                            cleanSheet: false
                        },
                        away: {
                            predicted_xG: awayXG,
                            corners: null,
                            playerToScore: null,
                            cleanSheet: false
                        }
                    }
            })
        }
        console.log("PREDICTIONS SEEDED!")
        seedDB(premierLeagueMatches);
        // deleteDB()
        
    } catch (error) {
        console.log(error)
    }
}

const deleteDB = async () => {
    try {
        await client.db("database").collection("matches").deleteMany({})
        await client.close()
        console.log("Matches deleted!")
    } catch (error) {
        console.log(`Error deleting matches: ${error}`)
    }
}

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
                // console.log(`Inserted match for ${match.date} - ${match.opponent}`);
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
seedUsers()


    /*
    Code initially fetches the webpage from fbref and stores it as a variable, it then searches through the HTML document to find an element with the id "comp" and checks for 
    all elements associated with comp that also contain "premier league" for each one that has their "comp" set as "premier league" we fetch the match date, opponent, xgFor and xgAgainst,
    we then store this info as an object "matchInfo" and push it to an array
    */
