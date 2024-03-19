import TripReviewWritingLayout from "@/layout/tripreviewwriting/layout";
import { debounce } from "@/utils/debounce";
import React, { useEffect, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import supabase from "@/lib/supabase/supabase";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { useUploadImage } from "@/utils/uploadReviewImage";
import {
  useSessionStore,
  useUserSessionIdStore,
} from "@/store/useSessionStore";

import "swiper/css";
import "swiper/css/pagination";

function index() {
  SwiperCore.use([Pagination]);
  const { userSession, setUserSession } = useSessionStore();
  const { userSessionId, setUserSessionId } = useUserSessionIdStore();
  const [textContents, setTextContents] = useState("");
  const [title, setTitle] = useState("");
  const [uploadImage, setUploadImage]: any = useState([]);
  const [imageSrc, setImageSrc]: any = useState([]);
  const swiperRef = useRef<SwiperCore>();

  console.log(title);

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUserSession(data);
      setUserSessionId(data.session?.user.id);
    };
    getUserSession();
  }, []);

  const titleHandler = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, 200);

  const handleTextContents = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const updatedText = e.target.value;
      setTextContents(updatedText);
    },
    500,
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const files = Array.from(e.target.files);
      setUploadImage((prevUploadImages: any) => [
        ...prevUploadImages,
        ...files,
      ]);

      const promises = files.map((file) => {
        return new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImageSrc((prevState: any) => [
              ...prevState,
              reader.result || null,
            ]);
            resolve();
          };
        });
      });

      Promise.all(promises).then(() => {
        console.log(imageSrc);
      });
    }
  };

  const handleDeleteImage = (e: React.MouseEvent, index: number) => {
    const targetImage = e.currentTarget.parentNode?.querySelector("img");
    const targetImageSrc = targetImage?.getAttribute("src");

    setUploadImage((prevUploadImages: any[]) =>
      prevUploadImages.filter((i) => i !== index),
    );

    if (targetImageSrc) {
      setImageSrc((prevImageSrc: any) =>
        prevImageSrc.filter((item: string) => item !== targetImageSrc),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imagePaths = await useUploadImage(uploadImage);
      const uploadImagePaths = imagePaths?.map((item) => item?.data.publicUrl);
      const { error } = await supabase.from("reviews").insert([
        {
          user_email: userSession?.user.email,
          review_data: textContents,
          review_image: uploadImagePaths || null,
          user_id: userSession?.user.id,
          title: title,
        },
      ]);
      if (textContents === "") {
        alert("글을 작성해주세요");
      }
      if (Array.from(imageSrc).length === 0) {
        alert("이미지를 선택해주세요");
      }
      if (error) {
        alert("리뷰 등록에 실패했습니다.");
        console.log(error);
      } else {
        alert("리뷰 작성이 완료되었습니다.");
        setTextContents("");
        setImageSrc([]);
        setTitle("");
      }
    } catch (error) {
      console.error(error);
      alert("리뷰 등록에 실패했습니다");
    }
  };

  return (
    <TripReviewWritingLayout>
      <div className="flex flex-col lg:grid sm:grid-cols-2 mx-9 h-[90%]">
        <div className="w-full block  mx-auto relative border-[1px] h-[800px] box-content ">
          <form
            action=""
            className={
              Array.from(imageSrc).length === 0
                ? `bg-pink-300 absolute top-1/2 left-1/2 z-10 ml-[-50px] mt-[-50px]`
                : `hidden`
            }
          >
            <label
              htmlFor="input-file"
              className="input-file-button px-6 py-2 bg-primary text-white cursor-pointer w-8 h-5 rounded-md"
            >
              이미지 선택
            </label>
            <input
              type="file"
              id="input-file"
              // className="w-full h-full text-center "
              className="hidden"
              // style={{ display: "none" }}
              accept="image/*"
              multiple
              onChange={(e) => handleUpload(e)}
            />
          </form>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={true}
            modules={[Pagination]}
            centeredSlides={true}
            className="w-full  mx-auto h-full flex overflow-hidden bg-slate-100"
          >
            {imageSrc.map((image: string | undefined, index: number) => (
              <SwiperSlide
                key={index}
                className="relative h-full flex items-center"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full  mx-auto object-scale-down h-full"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1"
                  onClick={(e) => handleDeleteImage(e, index)}
                >
                  <BsX color="#828282" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="row-span-2 shrink ">
          <form action="">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="border border-gray-300 outline-none w-full p-3"
              onChange={titleHandler}
            />
          </form>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="border border-gray-300 outline-none resize-none p-3 h-full w-full shrink"
            onChange={handleTextContents}
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-point text-white py-3 px-4 col-span-2 my-4 mb-10"
        >
          리뷰 작성
        </button>
      </div>
    </TripReviewWritingLayout>
  );
}

export default index;
