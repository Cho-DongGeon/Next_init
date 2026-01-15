import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href={'/test'}>테스트 페이지로 이동하기</Link>
    </div>
  );
}
