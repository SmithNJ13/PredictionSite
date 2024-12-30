import React from 'react'
// Transfers, injuries, suspensions, manager changes, recent victories

const NewsFeed = () => {
  return (
    <div id="border-box" className="absolute bg-white w-[360px] h-[500px] top-[100px] right-[5px] rounded">
        <div className="relative">
            <section>
                <h1>Player Suspension</h1>
                <p>John has been suspended for 3 games</p>
            </section>
            <section>
                <h1>Player Injury</h1>
                <p>Kirk has been injured, with a ALS tear</p>
            </section>
            <section>
                <h1>Player Suspension</h1>
                <p>Michael has a one game suspension</p>
            </section>
            <section>
                <h1>TeamOne achieves victory over TeamTwo</h1>
                <p>TeamOne beat TeamTwo, 3-1 in a dominating performance</p>
            </section>
            <section>
                <h1>TeamSix achieves victory over TeamEleven</h1>
                <p>Following a shaky start, TeamSix closes out the game in the 87th minute, defeating TeamEleven 1-0</p>
            </section>
        </div>
        <div>
            <button className="relative top-[-200px] right-[20px] font-bold w-[20px] shadow border rounded">{"->"}</button>
        </div>
    </div>
  )
}

export default NewsFeed
