/**
 * Sayfa ScrollView'ı yerine yatay carousel'lerden gelen scroll olayları
 * (scrollTop=0) header/FAB görünürlüğünü bozuyordu. Bu yardımcılar yalnızca
 * ana dikey kaydırıcıyı dikkate alır; diğer olaylar için null döner.
 */
export function getPageScrollY(e: Event): number | null {
  const t = e.target;
  if (t instanceof HTMLElement) {
    // Dikeyde anlamlı kaydırma alanı olmayan öğeleri (yatay listeler vb.) yok say
    if (t.scrollHeight - t.clientHeight < 200) return null;
    return t.scrollTop;
  }
  return window.scrollY;
}

export function getPageScroller(e: Event): HTMLElement | null {
  const t = e.target;
  if (t instanceof HTMLElement && t.scrollHeight - t.clientHeight >= 200) return t;
  return null;
}

/**
 * RNW ScrollView'ının div'inde hem scrollIntoView hem scrollTo() metodu
 * Chrome'da sessizce işe yaramıyor; güvenilir tek yol scrollTop'a doğrudan
 * atama. Bu yüzden yumuşak kaydırmayı rAF ile kendimiz çizeriz.
 */
export function smoothScrollTo(scroller: HTMLElement, targetTop: number) {
  const start = scroller.scrollTop;
  const delta = targetTop - start;
  if (Math.abs(delta) < 1) return;
  // Mesafeye göre süre: kısa mesafede çevik, uzun mesafede izlenebilir
  const duration = Math.min(800, 300 + Math.abs(delta) * 0.04);
  const t0 = performance.now();
  let lastWritten = start;
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    // Kullanıcı bu arada parmağıyla kaydırdıysa (dokunma fling'i animasyonla
    // yarışabiliyor) inatlaşma, animasyonu bırak.
    if (Math.abs(scroller.scrollTop - lastWritten) > 24) return;
    const t = Math.min((now - t0) / duration, 1);
    lastWritten = start + delta * easeInOutCubic(t);
    scroller.scrollTop = lastWritten;
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      // Bitişte hedefe sabitle (URL çubuğu/viewport oynamalarına karşı)
      scroller.scrollTop = targetTop;
    }
  };
  requestAnimationFrame(step);
}

export function findPageScroller(from?: HTMLElement | null): HTMLElement | null {
  let node: HTMLElement | null = from ?? null;
  while (node && node.scrollHeight - node.clientHeight < 200) {
    node = node.parentElement;
  }
  if (node) return node;
  const candidates = Array.from(document.querySelectorAll<HTMLElement>('div')).filter(
    (d) => d.scrollHeight - d.clientHeight >= 200
  );
  return candidates[0] ?? null;
}

export function scrollToId(id: string, headerOffset = 70) {
  const el = document.getElementById(id);
  if (!el) return;
  const scroller = findPageScroller(el.parentElement);
  if (scroller) {
    const top =
      el.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      headerOffset;
    smoothScrollTo(scroller, top);
  } else {
    el.scrollIntoView();
  }
}
