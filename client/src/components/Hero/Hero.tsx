import React, { useEffect, useLayoutEffect } from 'react'
import './hero.scss'
import Link from "next/link";
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const Hero = () => {
    //hero reveal animation
    useLayoutEffect(() => {
        // console.log(window.innerWidth)
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".hero-text .line", {
            scaleX:2,
            duration: 2,
            stagger: 0.2,
        })

        gsap.to(".hero-text span h1", {
            y: 0,
            rotate: 0,
            duration: 0.5,
            delay: 1,
            stagger: 0.2,
        })

        gsap.to(".hero-text .buttons", {
            y: 20,
            autoAlpha:1,
            duration: 0.8,
            delay: 2,
        })

        if(window.innerWidth <= 600){
            gsap.to(".hero-wrapper .img", {
                clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                delay: 2.2,
                stagger: 0.2,
                scale: 1,
            })
        }
        

    }, [])

    
    return (
    <div className='hero'>
        <div className='hero-wrapper'>
            <div className='hero-text'>
                <span><h1>Transforming</h1></span>
                <div className="line"></div>
                <span><h1>Legal Records</h1></span>
                <div className="line"></div>
                <span><h1>with Blockchain</h1></span>
                <div className="line"></div>
                <div className="buttons">
                    <Link href='/CaseDetails/caseStatus'>
                        <button className="gradient-button">
                        <span>Search case</span>
                        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="m.819 50.513 8.307 8.238 38.423-38.454-.059 28.89h11.638V.424H10.47l-.14 11.564h28.983L.819 50.513Zm55.31-47.09v42.764V3.424Z" fill="currentColor"></path></svg></button>
                    </Link>
                    <Link href='/Vault'>
                        <button className="gradient-button"><span>Send files</span><svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="m.819 50.513 8.307 8.238 38.423-38.454-.059 28.89h11.638V.424H10.47l-.14 11.564h28.983L.819 50.513Zm55.31-47.09v42.764V3.424Z" fill="currentColor"></path></svg></button>
                    </Link>
                </div>
                
            </div>
            <div className="img"></div>
            <div className="raise-funds">
                <Link href='/findAttorney'>
                     <button className="gradient-button">
                     <span>Find an attorney</span>
                     <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="m.819 50.513 8.307 8.238 38.423-38.454-.059 28.89h11.638V.424H10.47l-.14 11.564h28.983L.819 50.513Zm55.31-47.09v42.764V3.424Z" fill="currentColor"></path></svg></button>
                </Link>
                <p>Discover the future of legal representation with our revolutionary platform. Seamlessly navigate through a secure repository of attorney profiles, each meticulously linked to relevant case histories, ensuring transparency and trust. Effortlessly find the perfect legal advocate for your needs, backed by verified credentials and a tamper-proof track record. </p>
            </div>
            
        </div>
        
    </div>
  )
}

export default Hero