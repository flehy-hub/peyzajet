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
 * Bir bölüme yumuşak kaydırma. scrollIntoView, sayfa RNW ScrollView div'i
 * içinde kaydığı için Android Chrome'da güvenilir çalışmıyor; bunun yerine
 * dikey kaydırıcıyı bulup scrollTo ile hedefe gideriz.
 */
export function scrollToId(id: string, headerOffset = 70) {
  const el = document.getElementById(id);
  if (!el) return;
  let scroller: HTMLElement | null = el.parentElement;
  while (scroller && scroller.scrollHeight - scroller.clientHeight < 200) {
    scroller = scroller.parentElement;
  }
  if (scroller) {
    const top =
      el.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      headerOffset;
    try {
      scroller.scrollTo({ top, behavior: 'smooth' });
    } catch {
      scroller.scrollTop = top;
    }
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
