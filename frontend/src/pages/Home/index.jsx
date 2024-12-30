import { useState, useEffect } from "react";
import { TeamBanner, NewsFeed} from "../../components/export";
import axios from "axios";
import "./style.css";



const HomePage = () => {
  

  return (
    <>
    <NewsFeed />
    <div className="hero-section">
      <h1>Welcome to Prediccion Football</h1>
      <h2>Here you can make predictions on your favourite football matches</h2>
    </div>
    <div>
      <section>
        <h1>View a list of live matches</h1>
      </section>
      <section>
        <h1>Read up on team information and statistics</h1>
      </section>
      <section>
        <h1>Make predictions on match outcomes and team performance</h1>
      </section>
      <section>
        <h1>Track your prediction history and your performance</h1>
        <p>Compare your statistics against a leaderboard of other users</p>
      </section>
      <section>
        <h1>Do it all for <a className="font-bold">FREE</a> by signing up <a href="/register" className="text-blue-800 hover:underline">here</a></h1>
      </section>
    </div>
    </>
  );
};

export default HomePage;
