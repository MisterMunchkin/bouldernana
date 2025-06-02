alter table public.climbs enable row level security;

CREATE POLICY "Authenticated users can view their own records" 
ON public.climbs 
FOR SELECT 
TO authenticated 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Authenticated users can insert new records" 
ON public.climbs 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update their own records" 
ON public.climbs 
FOR UPDATE 
TO authenticated 
USING ((select auth.uid()) = user_id) 
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete their own records" 
ON public.climbs 
FOR DELETE 
TO authenticated 
USING ((select auth.uid()) = user_id);