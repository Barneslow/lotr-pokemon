import Image from "next/image";
import overlay from "../../assets/images/Xoverlay.png";

const DeadOverlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, .3)",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
      }}
    >
      <Image
        src={overlay}
        alt="dead character overlay"
        width={200}
        height={200}
      />
    </div>
  );
};

export default DeadOverlay;
