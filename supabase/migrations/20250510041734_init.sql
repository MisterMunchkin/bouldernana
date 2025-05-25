-- Create the media table
create table media (
    id uuid default gen_random_uuid() primary key,
    bucketKey text not null,
    type text check (type in ('video', 'photo')) not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

-- Create the climbs table
create table climbs (
    id uuid default gen_random_uuid() primary key,
    typeOfClimb text check (typeOfClimb in ('Board', 'Boulder', 'Route', 'Trad')) default 'Boulder',
    whereDidYouClimb text check (whereDidYouClimb in ('Indoor', 'Outdoor')) default 'Indoor',
    grade text not null,
    ascentType text check (ascentType in ('Flash', 'Onsight', 'Redpoint', 'Project')),
    attempts integer,
    hasBeenSent boolean default false,
    howDidItFeel text check (howDidItFeel in ('Hard', 'Soft', 'Solid')),
    skill text[] check (skill <@ array['Athletic', 'Crimpy', 'Cruxy', 'Endurance', 'Slopey', 'Technical', 'Power', 'Dyno']),
    steepness text check (steepness in ('Slab', 'Overhang', 'Vert', 'Roof')),
    date timestamptz not null,
    notes text,
    link text,
    media_ids uuid[] default '{}', -- Array of references to the media table
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

-- Enable realtime
alter
  publication supabase_realtime add table climbs;

-- Legend-State helper to facilitate "Sync only diffs" (changesSince: 'last-sync') mode
CREATE OR REPLACE FUNCTION handle_times()
    RETURNS trigger AS
    $$
    BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSEIF (TG_OP = 'UPDATE') THEN
        NEW.created_at = OLD.created_at;
        NEW.updated_at = now();
    END IF;
    RETURN NEW;
    END;
    $$ language plpgsql;

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON climbs
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();

CREATE TRIGGER handle_times_media
    BEFORE INSERT OR UPDATE ON media
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();