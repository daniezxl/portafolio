import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";
import { PlateCanvas } from "@/components/Plate";
import { SiteNav } from "@/components/SiteNav";

export default function NotFound() {
  return (
    <div className="page">
      <SiteNav />
      <main className="main lost" id="content">
        <h1 className="page-title">This rabbit went down another hole</h1>
        <p className="page-lede">The page you're looking for doesn't exist or has moved.</p>
        <div className="cover">
          <PlateCanvas seed="404" technique="tramado" motion="always" className="plate-strip" framing="strip" onPointerLight />
        </div>
        <Link href="/" className="back">
          <ArrowLeft /> Back home
        </Link>
      </main>
    </div>
  );
}
