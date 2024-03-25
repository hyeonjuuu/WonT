import Lottie from "react-lottie-player";
import loadingJson from "@/asset/loading/loading.json";

function Loading() {
  return (
    <div className="flex items-center flex-col h-screen">
      <Lottie
        loop
        animationData={loadingJson}
        play
        style={{ height: "200px", width: "200px" }}
      />
    </div>
  );
}

export default Loading;
