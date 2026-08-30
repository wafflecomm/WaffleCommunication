-- ==============================================================================
-- ☕ 와플커뮤니케이션 커피 후원 플랫폼 Supabase 테이블 스키마 & RLS 정책
-- ==============================================================================
-- 사용법: Supabase Dashboard > SQL Editor에 복사하여 붙여넣고 [Run]을 누르세요.

-- 1. donations 테이블 생성
create table if not exists public.donations (
    id uuid primary key default gen_random_uuid(),
    target text not null default '와플커뮤니케이션',
    nickname text not null default '익명의 후원자',
    cups integer not null default 1,
    amount text not null,
    amount_krw integer,
    amount_usd numeric(10, 2),
    message text,
    payment_id text,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. 인덱스 생성 (타겟별, 최신순 조회 최적화)
create index if not exists donations_target_created_at_idx 
on public.donations (target, created_at desc);

-- 3. 실시간(Realtime) 복제 활성화 (페이지 새로고침 없는 실시간 피드 지원)
alter publication supabase_realtime add table public.donations;

-- 4. 행 수준 보안 (RLS) 활성화
alter table public.donations enable row level security;

-- 5. 공개 읽기 정책 (모든 방문자가 후원자 피드를 조회 가능)
create policy "Allow public read access on donations"
on public.donations for select
to anon, authenticated
using (true);

-- 6. 공개 등록 정책 (후원 완료 시 메시지 등록 허용)
create policy "Allow public insert access on donations"
on public.donations for insert
to anon, authenticated
with check (true);
