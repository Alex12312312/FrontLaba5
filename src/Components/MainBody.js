import React, { useEffect, useState } from "react";
import Slide from "./Slide"
import FakeButton from "./FakeButtons";

function SiteBody(){

    return(
    <div id="mainBody">
        <section id="slides">
            <Slide imgSrc="https://mykaleidoscope.ru/x/uploads/posts/2023-04/1682491408_mykaleidoscope-ru-p-dacha-repina-pod-peterburgom-dizain-oboi-34.jpg"
             text="УГУ - лучший университет!" />
            <FakeButton text="О приёмной кампании"/>
             <Slide imgSrc="https://masterpiecer-images.s3.yandex.net/74b625a57d3b11eea8b44659bdca6a39:upscaled"
             text="Политика Университета" />
             <FakeButton text="Важные документы"/>
             <Slide imgSrc="https://cs10.pikabu.ru/post_img/2020/06/05/5/og_og_159134317522981980.jpg"
             text="Трудоустройство студентов" />
             <FakeButton text="История Университета"/>
        </section>
    </div>
    )
}

export default SiteBody