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
