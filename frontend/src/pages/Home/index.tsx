import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="text-primaryText flex justify-center my-16">
      {/* Main Content Container */}
      <div
        className="relative max-w-7xl w-full grid gap-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(76,175,80,0.05), transparent 70%)",
          borderLeft: "2px solid #4CAF50",
          borderTop: "2px solid #4CAF50",
          borderRadius: "1.5rem",
        }}
      >
        {/* Hero Section */}
        <section className="relative z-10 p-12">
          <h1
            id="title"
            className="font-heading text-4xl lg:text-5xl font-bold tracking-wide mb-6 drop-shadow-lg"
            style={{
              textShadow:
                "0 0 8px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Welcome to{" "}
            <span className="underline decoration-primaryAccent">
              Premier League Predictions
            </span>
          </h1>
          <p className="text-lg font-mainText mb-6 max-w-3xl">
            Join thousands of football fans making predictions on Premier League
            matches. Track your accuracy, compete with others, and prove your
            football knowledge.
          </p>
          <Link
            to="/profile"
            className="inline-block bg-primaryAccent/70 text-primaryText px-8 py-3 rounded-lg font-mainInfo text-lg hover:bg-primaryAccent/90 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-black/50 border-2 border-transparent"
          >
            Start Predicting Now
          </Link>
        </section>

        {/* Features Section */}
        <section className="relative z-10 grid gap-6 lg:grid-cols-[2fr_1fr] lg:grid-rows-[repeat(2,auto)] p-8">
          {/* Left Column (Top + Bottom Rows) */}
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Make Predictions */}
              <div className="relative group p-8 bg-mainForeground rounded-2xl border border-primaryAccent shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-primaryAccent/50 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300 group-hover:bg-primaryAccent/70">
                    <svg
                      className="w-6 h-6 text-primaryAccent"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-subheading">
                    MAKE PREDICTIONS
                  </h3>
                </div>
                <p className="text-secondaryText font-mainText leading-relaxed">
                  Test your intuition by making predictions on upcoming games.
                  Whether for fun or to showcase your expertise, every prediction
                  counts.
                </p>
              </div>

              {/* View Live Games */}
              <div className="relative group p-8 bg-mainForeground rounded-2xl border border-primaryAccent shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-primaryAccent/50 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300 group-hover:bg-primaryAccent/70">
                    <svg
                      className="w-6 h-6 text-primaryText"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-subheading">
                    VIEW LIVE GAMES
                  </h3>
                </div>
                <p className="text-secondaryText font-mainText leading-relaxed">
                  Stay in the action with live updates and real-time stats for
                  ongoing games. Never miss a chance to predict.
                </p>
              </div>
            </div>

            {/* Ranked Leaderboards */}
            <div className="relative group p-8 bg-mainForeground rounded-2xl border border-primaryAccent shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-primaryAccent/50 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300 group-hover:bg-primaryAccent/70">
                  <svg
                    className="w-6 h-6 text-primaryAccent"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-subheading">
                  RANKED LEADERBOARDS
                </h3>
              </div>
              <p className="text-secondaryText font-mainText leading-relaxed mb-4">
                Compete with other predictors and see where you rank in
                real-time.
              </p>
              <Link
                to="/leaderboards"
                className="inline-flex items-center text-primaryAccent hover:text-primaryText hover:underline hover:decoration-primaryAccent font-mainInfo font-semibold transition-colors duration-300"
              >
                View Rankings
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Track Your Progress */}
          <div className="relative group p-8 bg-mainForeground rounded-2xl border border-primaryAccent shadow-md hover:shadow-xl transition-shadow duration-300 self-start h-full">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-primaryAccent/50 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300 group-hover:bg-primaryAccent/70">
                <svg
                  className="w-6 h-6 text-primaryText"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-subheading">
                TRACK YOUR PROGRESS
              </h3>
            </div>
            <p className="text-secondaryText font-mainText leading-relaxed">
              Check your prediction history and accuracy. See trends and refine
              your strategy with insights.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
