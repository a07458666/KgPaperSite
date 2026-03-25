import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-content">
      <section className="section-card hero-card">
        <div className="eyebrow">Page Not Found</div>
        <h1 className="hero-title">找不到這個頁面</h1>
        <p className="hero-subtitle">
          這個路由目前不存在，請回到首頁或從導覽列重新進入其他頁面。
        </p>
        <div className="cta-row">
          <Link className="button-link primary" href="/">
            回到首頁
          </Link>
        </div>
      </section>
    </main>
  );
}
