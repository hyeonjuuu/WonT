"use client";
import { Suspense } from "react";
import Lottie from "react-lottie-player";
import loadingJson from "@/asset/loading/loading.json";
import Loading from "@/asset/loading/LoadingSpinner";

function loading() {
  return <Suspense fallback={<Loading />}></Suspense>;
}

export default loading;
