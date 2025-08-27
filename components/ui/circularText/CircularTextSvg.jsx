import styles from "@/components/ui/circularText/CircularTextSvg.module.scss";
const CircularTextSvg = () => {
  return (
    <svg
      className={styles.circularText} // Apply the responsive class here
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="circlePath"
          d="M 100, 100
         m -75, 0
         a 75,75 0 1,1 150,0
         a 75,75 0 1,1 -150,0"
        />
      </defs>
      <text fontSize="14" fontFamily="Arial" fill="black">
        <textPath href="#circlePath" textLength="450">
          - DECOUVRIR - LE - <tspan fill="red">CALCULATEUR</tspan>
        </textPath>
      </text>
    </svg>
  );
};

export default CircularTextSvg;
