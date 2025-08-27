"use client";
import Image from "next/image";
import styles from "@/app/anas/Histoire.module.scss";
import { TimelineMois } from "@/data/site";
import { m } from "framer-motion";
import { bottom } from "@popperjs/core";
import { useState, useEffect } from "react";

function Histoire() {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="d-flex align-items-center w-100">
        {/* Left Column - Images */}

        <div className="d-flex flex-column ">
          {TimelineMois.map((mois, index) => (
            <div key={index} className="d-flex  align-items-center">
              <div className="d-flex flex-column  text-center">
                <div>{mois.mois}</div>

                {mois.mois !== "NOVEMBRE 2024" && (
                  <Image
                    src={mois.img}
                    alt={mois.mois}
                    width={50}
                    height={128}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Middle Column - Timeline */}
        <div
          className={`d-flex flex-column align-items-center ${styles.container}`}
        >
          <div className={styles.line}></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={`rounded-circle ${styles.circle}`}>
              {index + 1}
            </div>
          ))}
        </div>

        {/* Right Column - Text */}
        <div className="d-flex flex-column " style={{ maxWidth: "800px" }}>
          {TimelineMois?.map((mois, index) => (
            <div key={index} className="d-flex flex-column  mt-1">
              {/*
          
             <h5
                style={{
                  ...(mois.mois === "SEPTEMBRE 2024"
                    ? { marginBottom: "140px" }
                    : {}),
                  ...(mois.mois === "MAI 2024" ? { marginTop: "65px" } : {}),
                }}
              >
                {mois.titre}
              </h5>
          
          
          */}{" "}
              <h5>{mois.titre}</h5>
              <p className=" ">{mois.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Histoire;
