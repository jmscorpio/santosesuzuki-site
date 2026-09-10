import { ImageResponse } from "next/og";
import { escritorio } from "@/config/escritorio";
import { mensagemCentral } from "@/content/home";

export const alt = `${escritorio.nomeCompleto} — Advocacia empresarial estratégica`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#002b33",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 2, background: "#c0cf13" }} />
          <span
            style={{
              color: "#c0cf13",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Santos &amp; Suzuki Advocacia
          </span>
        </div>

        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 60,
            lineHeight: 1.18,
            letterSpacing: -1.5,
            maxWidth: 940,
          }}
        >
          {mensagemCentral}
        </div>

        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.55)",
            fontSize: 24,
          }}
        >
          {escritorio.dominio} · {escritorio.endereco.cidade}/
          {escritorio.endereco.uf}
        </div>
      </div>
    ),
    size,
  );
}
