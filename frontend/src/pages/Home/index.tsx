import { Link } from "react-router-dom"
import "./style.css";

const HomePage = () => {
  return (
    <>
      <main id="mainBody" className="text-AshGray flex flex-col overflow-hidden my-20 mx-12">
        <div id="content" className="bg-GunMetal rounded-2xl border-none relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-SpringGreen/10 via-transparent to-DarkSpring/20 pointer-events-none"></div>
          
          <div className="absolute top-10 right-10 w-32 h-32 bg-SpringGreen/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-DarkSpring/10 rounded-full blur-lg animate-pulse delay-1000"></div>
          
          <div className="relative z-10">
            <h1 id="title" className="text-SpringGreen text-4xl lg:text-5xl border-b-[2px] border-DarkSpring font-bold my-[2rem] px-8 pb-4 tracking-wide drop-shadow-lg" style={{textShadow: '0 0 8px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,0.5)'}}>
              WELCOME TO PREMIER LEAGUE PREDICTIONS!
            </h1>
            
            <div className="px-8 mb-12">
              <div className="bg-gradient-to-r from-SpringGreen/20 to-DarkSpring/20 rounded-xl p-8 border border-SpringGreen/30 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-SpringGreen mb-4">Test Your Football Instincts</h2>
                <p className="text-lg mb-6 text-AshGray/90">
                  Join thousands of football fans making predictions on Premier League matches. 
                  Track your accuracy, compete with others, and prove your football knowledge.
                </p>
                <a 
                  href="/profile" 
                  className="inline-block bg-SpringGreen text-GunMetal px-8 py-3 rounded-lg font-bold text-lg hover:bg-SpringGreen/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-SpringGreen/25"
                >
                  Start Predicting Now
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 px-8 pb-12">
              
              <div className="group bg-gradient-to-br from-SpringGreen/10 to-transparent rounded-xl p-6 border border-SpringGreen/20 hover:border-SpringGreen/40 transition-all duration-300 hover:shadow-lg hover:shadow-SpringGreen/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-SpringGreen/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-SpringGreen/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-SpringGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-SpringGreen">MAKE PREDICTIONS</h3>
                </div>
                <p className="text-AshGray/90 leading-relaxed">
                  Test your intuition by making predictions on upcoming games. Choose match outcomes, scorelines, 
                  or even more specific events. Whether you play for fun or aim to showcase your expertise, 
                  every prediction counts toward building your reputation as a top predictor.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-Moonstone/10 to-transparent rounded-xl p-6 border border-Moonstone/20 hover:border-Moonstone/40 transition-all duration-300 hover:shadow-lg hover:shadow-Moonstone/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-Moonstone/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-Moonstone/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-Moonstone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Moonstone">VIEW LIVE GAMES</h3>
                </div>
                <p className="text-AshGray/90 leading-relaxed">
                  Stay in the action by exploring a constantly updated list of live games. See real-time stats, 
                  track match progress, and make predictions while the action unfolds. With all the latest fixtures 
                  at your fingertips, you'll never miss an opportunity to weigh in on the biggest games.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-Moonstone/10 to-transparent rounded-xl p-6 border border-Moonstone/20 hover:border-Moonstone/40 transition-all duration-300 hover:shadow-lg hover:shadow-Moonstone/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-Moonstone/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-Moonstone/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-Moonstone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Moonstone">TRACK YOUR PROGRESS</h3>
                </div>
                <p className="text-AshGray/90 leading-relaxed">
                  Wonder how you're doing? Check out your prediction history to see your past choices and results. 
                  Get an overview of your performance with a personalized accuracy rating. It's the perfect way to 
                  refine your skills, identify trends, and aim for even better results.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-SpringGreen/10 to-transparent rounded-xl p-6 border border-SpringGreen/20 hover:border-SpringGreen/40 transition-all duration-300 hover:shadow-lg hover:shadow-SpringGreen/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-SpringGreen/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-SpringGreen/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-SpringGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-SpringGreen">RANKED LEADERBOARDS</h3>
                </div>
                <p className="text-AshGray/90 leading-relaxed mb-4">
                  See how you stack up against other predictors in our competitive rankings. Climb the leaderboards 
                  by making accurate predictions and building your reputation. Track your progress from rookie to 
                  expert as you compete with the best football minds in the community.
                </p>
                <Link to="/leaderboards" className="inline-flex items-center text-SpringGreen hover:text-white font-semibold transition-colors duration-300">View Rankings
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;