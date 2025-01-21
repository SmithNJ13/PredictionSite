import { useState, useEffect } from "react";
import { TeamBanner, NewsFeed} from "../../components/export";
import axios from "axios";
import "./style.css";



const HomePage = () => {
  

  return (
  <>
    {/* <NewsFeed /> */}
    <main id="mainBody" className="text-AshGray flex flex-col overflow-hidden my-[2rem] mx-[2rem]">
        <div id="content" className="bg-GunMetal rounded-2xl border-none">
          <h1 id="title" className="text-SpringGreen text-4xl border-b-[2px] border-DarkSpring bold my-[2rem]">WELCOME TO PREMIER LEAGUE PREDICTIONS!</h1>
          <section className="text-center self-start p-[1rem] w-[50%]">
            <p className="mx-[5rem] text-2xl underline">MAKE PREDICTIONS</p>
            <p>Test your intuition by making predictions on upcoming games. Choose match outcomes, scorelines, or even more specific events. 
              Whether you play for fun or aim to showcase your expertise, every prediction counts toward building your reputation as a top predictor. 
              Dive in and see how accurate you can be!</p>
          </section>
          <section className="text-center self-end p-[1rem] w-[50%]">
            <p className="mx-[5rem] text-2xl underline">VIEW LIVE GAMES</p>
            <p>Stay in the action by exploring a constantly updated list of live games. See real-time stats, track match progress, 
              and make predictions while the action unfolds. With all the latest fixtures at your fingertips, you’ll never miss an 
              opportunity to weigh in on the biggest games.</p>
          </section>
          <section className="text-center self-start p-[1rem] w-[50%]">
            <p className="mx-[5rem] text-2xl underline">TRACK PREDICTION PROGRESS</p>
            <p>Wonder how you’re doing? Check out your prediction history to see your past choices and results. 
              Get an overview of your performance with a personalized accuracy rating. It’s the perfect way to refine your skills, 
              identify trends, and aim for even better results.</p>
          </section>
          <section className="text-center self-center p-[1rem] w-[50%]">
            <p className="mx-[5rem] text-2xl underline">SIGN UP TODAY!</p>
            <p className="mb-[5rem] ">Ready to get started? Signing up unlocks all the features, including live game updates, prediction tracking, and personalized insights. 
              Whether you’re here to compete, have fun, or just follow along, it’s free and easy to join. Don’t wait — <a href="/register" className="signUp text-Moonstone underline font-bold italic text-base hover:text-white">sign up</a> today and get predicting!</p>
          </section>
        </div>
    </main>
  </>
  );
};

export default HomePage;
