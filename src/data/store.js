const STORAGE_KEY = 'essays';

const defaultEssays = [
  {
    id: 1,
    title: '一些事',
    content: '有些事情，说不清楚，也没必要说清楚。\n\n就让它沉着吧。',
    publishedAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: '关于失眠',
    content: '深夜三点，睡不着。脑子里转的都是白天没说出口的话。\n\n也许不说更好。',
    publishedAt: '2025-03-15T00:00:00.000Z',
    updatedAt: '2025-06-10T00:00:00.000Z',
  },
];

export function getEssays() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEssays));
      return defaultEssays;
    }
    return JSON.parse(raw);
  } catch {
    return defaultEssays;
  }
}

export function saveEssays(essays) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(essays));
}

export function getEssayById(id) {
  return getEssays().find((e) => e.id === Number(id));
}

export function createEssay(data) {
  const essays = getEssays();
  const now = new Date().toISOString();
  const newEssay = {
    id: Date.now(),
    title: data.title || '无题',
    content: data.content || '',
    publishedAt: data.publishedAt || now,
    updatedAt: now,
  };
  saveEssays([newEssay, ...essays]);
  return newEssay;
}

export function updateEssay(id, data) {
  const essays = getEssays();
  const idx = essays.findIndex((e) => e.id === Number(id));
  if (idx === -1) return null;
  const now = new Date().toISOString();
  essays[idx] = {
    ...essays[idx],
    ...data,
    id: essays[idx].id,
    updatedAt: now,
  };
  saveEssays(essays);
  return essays[idx];
}

export function deleteEssay(id) {
  const essays = getEssays().filter((e) => e.id !== Number(id));
  saveEssays(essays);
}
