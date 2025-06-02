drop table public.climbs;

create table public.climbs (
  id uuid not null default gen_random_uuid (),
  "typeOfClimb" text null default 'Boulder'::text,
  "whereDidYouClimb" text null default 'Indoor'::text,
  grade text not null default ''::text,
  "ascentType" text null default ''::text,
  attempts integer null,
  "hasBeenSent" boolean null default false,
  "howDidItFeel" text null default ''::text,
  skill text[] null,
  steepness text null default ''::text,
  date timestamp with time zone not null default now(),
  notes text null default ''::text,
  link text null default ''::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  deleted boolean null default false,
  "assetIds" text[] null default '{}'::text[],
  user_id uuid null default auth.uid (),
  constraint climbs_pkey primary key (id),
  constraint climbs_user_id_fkey foreign KEY (user_id) references auth.users (id) on update CASCADE on delete CASCADE,
  constraint climbs_ascenttype_check check (
    (
      "ascentType" = any (
        array[
          'Flash'::text,
          'Onsight'::text,
          'Redpoint'::text,
          'Project'::text
        ]
      )
    )
  ),
  constraint climbs_howdiditfeel_check check (
    (
      "howDidItFeel" = any (array['Hard'::text, 'Soft'::text, 'Solid'::text])
    )
  ),
  constraint climbs_steepness_check check (
    (
      steepness = any (
        array[
          'Slab'::text,
          'Overhang'::text,
          'Vert'::text,
          'Roof'::text
        ]
      )
    )
  ),
  constraint climbs_typeofclimb_check check (
    (
      "typeOfClimb" = any (
        array[
          'Board'::text,
          'Boulder'::text,
          'Route'::text,
          'Trad'::text
        ]
      )
    )
  ),
  constraint climbs_skill_check check (
    (
      skill <@ array[
        'Athletic'::text,
        'Crimpy'::text,
        'Cruxy'::text,
        'Endurance'::text,
        'Slopey'::text,
        'Technical'::text,
        'Power'::text,
        'Dyno'::text
      ]
    )
  ),
  constraint climbs_wheredidyouclimb_check check (
    (
      "whereDidYouClimb" = any (array['Indoor'::text, 'Outdoor'::text])
    )
  )
) TABLESPACE pg_default;

create trigger handle_times BEFORE INSERT
or
update on climbs for EACH row
execute FUNCTION handle_times ();
