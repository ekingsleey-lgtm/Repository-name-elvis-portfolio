import Image from "next/image";

function IPhoneFrame({
  src,
  alt,
  w,
  h,
  raisePercent = 0,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  raisePercent?: number;
}) {
  // Screen is an absolutely-positioned child with inset: "2% 3%".
  // For absolutely-positioned elements, top/bottom % resolve against the
  // containing block's HEIGHT; left/right % against its WIDTH — so both
  // reference the frame's own dimensions, not the parent's.
  //
  //   screen_W = W_frame × (1 − 2×0.03) = 0.94 × W_frame
  //   screen_H = H_frame × (1 − 2×0.02) = 0.96 × H_frame
  //
  // For screen_W / screen_H = image_w / image_h:
  //   (0.94 × W) / (0.96 × H) = w/h  →  AR = w×96 / (h×94)
  const frameAspectRatio = (w * 96) / (h * 94);

  return (
    <div
      style={{
        position: "relative",
        width: "clamp(140px, 28vw, 380px)",
        aspectRatio: frameAspectRatio,
        // Space Gray aluminium body
        background:
          "linear-gradient(160deg, #2a2a2c 0%, #1c1c1e 40%, #141416 100%)",
        borderRadius: "clamp(22px, 11%, 44px)",
        boxShadow:
          // Outer metallic rim
          "0 0 0 1.5px #48484a, " +
          // Inner inset edge
          "inset 0 0 0 1px rgba(255,255,255,0.07), " +
          // Ambient shadow
          "0 32px 72px -8px rgba(0,0,0,0.9), " +
          "0 8px 24px rgba(0,0,0,0.55)",
        transform: raisePercent ? `translateY(-${raisePercent}%)` : undefined,
        flexShrink: 0,
      }}
    >
      {/* Side / power button — right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -2.5,
          top: "25%",
          width: 3,
          height: "18%",
          background: "#48484a",
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Mute / ring-silent switch — left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -2.5,
          top: "16%",
          width: 3,
          height: "5%",
          background: "#48484a",
          borderRadius: "2px 0 0 2px",
        }}
      />

      {/* Volume up — left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -2.5,
          top: "25%",
          width: 3,
          height: "10%",
          background: "#48484a",
          borderRadius: "2px 0 0 2px",
        }}
      />

      {/* Volume down — left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -2.5,
          top: "38%",
          width: 3,
          height: "10%",
          background: "#48484a",
          borderRadius: "2px 0 0 2px",
        }}
      />

      {/* Screen glass */}
      <div
        style={{
          position: "absolute",
          inset: "2% 3%",
          borderRadius: "clamp(18px, 9%, 36px)",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Image
          fill
          src={src}
          alt={alt}
          style={{ objectFit: "cover", objectPosition: "top center" }}
          sizes="(min-width: 1440px) 358px, (min-width: 768px) 26vw, 131px"
        />

        {/* Notch — iPhone 13 / 14 pill notch, rendered above the screenshot */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "33%",
            height: "3.8%",
            background: "#1c1c1e",
            borderRadius: "0 0 clamp(6px, 4%, 14px) clamp(6px, 4%, 14px)",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

/**
 * KFC case study hero: two iPhone 13/14 device frames — Space Gray — over the
 * KFC campaign image with a dark scrim, presenting the Rewards Arcade new-user screens.
 * The right device is raised slightly for a staggered composition.
 */
export function KfcHeroComposition() {
  return (
    <div
      className="hero-composition"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(12px, 3vw, 56px)",
        paddingTop: "clamp(3rem, 7vw, 6.5rem)",
        paddingBottom: "clamp(3rem, 7vw, 6.5rem)",
      }}
    >
      {/* Background image */}
      <Image
        src="/work/kfc/kfc-hero.jpg"
        alt=""
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        sizes="100vw"
        priority
      />
      {/* Dark scrim */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.62)",
        }}
      />
      {/* Phone frames — above background and scrim */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 56px)" }}>
        <IPhoneFrame
          src="/work/kfc/kfc-screen-signin.png"
          alt="KFC Rewards new-user welcome screen — sign up or log in to claim a free reward"
          w={390}
          h={836}
        />
        <IPhoneFrame
          src="/work/kfc/kfc-screen-loading.png"
          alt="KFC Rewards Arcade loading screen — reward claim in progress with live progress indicators"
          w={390}
          h={836}
          raisePercent={5}
        />
      </div>
    </div>
  );
}
