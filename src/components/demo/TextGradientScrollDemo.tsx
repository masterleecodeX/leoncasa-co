import { siteConfig } from "@/config/site"

function TextGradientScrollDemo() {
  return (
    <div className="w-full relative py-8 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-4 items-center mb-0 ">
        <div className="flex p-4 text-base md:text-lg  w-[700px] max-w-full mx-auto flex flex-col items-start justify-center">
          {siteConfig.scrollText.map((text, index) => (
            <p key={index} className={index !== siteConfig.scrollText.length - 1 ? "mb-8 text-foreground" : "text-foreground"}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TextGradientScrollDemo
