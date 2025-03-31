"use client";
import React, { useState } from "react";
import { BiNotification } from "react-icons/bi";

const Notifications = () => {
  const [show, setShow] = useState(false);
  const [delayedShow, setDelayedShow] = useState(false);

  function handleShowClick() {
    if (!show) {
      setShow(!show);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        setDelayedShow(!delayedShow);
      }, 20);
    } else {
      setDelayedShow(!delayedShow);
      document.body.style.overflow = "auto";
      setTimeout(() => {
        setShow(!show);
      }, 200);
    }
  }

  return (
    <>
      <button
        className={` text-[1.5rem] sm:text-2xl text-lg  ${
          show && "d-none"
        } cursor-pointer hover:text-gray-500 `}
        onClick={handleShowClick}>
        <BiNotification />
      </button>

      <div
        className={`fixed top-0 right-0 w-full h-full justify-between  z-50 ${
          show ? "flex" : "d-none"
        }`}>
        <div
          className={`blank-part bg-[#6d6a6a66] z-50 flex-grow-1  ${
            delayedShow ? "show" : ""
          } `}
          onClick={handleShowClick}></div>
        <div className={`bg-white cart-border ${delayedShow ? "show" : ""} `}>
          <div
            className={`cart-part min-w-[90vw]  sm:min-w-[30rem] h-full bg-white p-3 overflow-y-scroll ${
              delayedShow ? "show" : ""
            } `}>
            <button
              className="w-full text-2xl font-semibold bg-transparent border-none text-right pe-8 "
              onClick={handleShowClick}>
              ✕
            </button>
            <hr className="my-3" />
            <ul className=" ps-1">
              <li>
                Notification <hr />
              </li>
              <li>
                Notification <hr />
              </li>
              <li>
                Notification <hr />
              </li>
              <li>
                Notification <hr />
              </li>
              <li>
                Notification <hr />
              </li>
              <li>
                Notification <hr />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
