import { For } from "solid-js";
import KzIcon from "/icon.svg";
import "./Home.css";

export default function HomePage() {
  const variationList = [
    " breezy",
    " blazing fast",
    "n uninterrupted",
    " snappy",
    " modern",
    " breezy",
  ];

  return (
    <div class="flex flex-col gap-20 px-10 md:px-14 py-16">
      <div class="flex flex-row justify-between items-center">
        <img src={KzIcon} class="h-21 w-21" alt="kzilla.xyz logo" />
        <button
          type="button"
          class="h-14 w-28 md:w-36 lg:w-42 p-2 align-middle border-2 bg-black text-white text-lg tracking-wider rounded-xl"
        >
          MY LINKS
        </button>
      </div>

      <div class="border">
        <div class="text-4xl md:text-6xl lg:text-8xl font-VisbyRoundLight">
          A
          <div class="inline-block relative overflow-hidden h-12 md:h-18 lg:h-24 align-bottom">
            <div class="text-roller">
              <For each={variationList}>
                {(text) => (
                  <div class="h-12 md:h-18 lg:h-24 flex items-center justify-start whitespace-nowrap">
                    {text}
                  </div>
                )}
              </For>
            </div>
          </div>
          <br />
          URL shrinker
        </div>
      </div>
    </div>
  );
}
