import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";
import { PlateCanvas } from "@/components/Plate";
import { SiteNav } from "@/components/SiteNav";

export default function NotFound() {
  return (
    <div className="page">
      <SiteNav />
      <main className="main lost" id="contenido">
        <h1 className="page-title">Este conejo se fue por otro agujero</h1>
        <p className="page-lede">La página que buscas no existe o cambió de dirección.</p>
        <div className="cover">
          <PlateCanvas seed="404" technique="tramado" motion="always" className="plate-strip" framing="strip" onPointerLight />
        </div>
        <Link href="/" className="back">
          <ArrowLeft /> Volver al inicio
        </Link>
      </main>
    </div>
  );
}
