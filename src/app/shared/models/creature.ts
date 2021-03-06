export class Creature {
    creature_id: Number;
    creature_name: string;
    race_id: Number;
    background_id: Number;
    creature_type_id: Number;
    creature_size_id: Number;
    armor_class: Number;
    ac_type: string;
    challenge_rating: Number;
    current_hitpoints: Number;
    max_hitpoints: Number;
    temporary_hitpoints: Number;
    expended_hitdie: string;
    speed: Number;
    climb_speed: Number;
    fly_speed: Number;
    swim_speed: Number;
    str_score: Number;
    dex_score: Number;
    con_score: Number;
    int_score: Number;
    wis_score: Number;
    cha_score: Number;
    failed_death_saves: Number;
    passed_death_saves: Number;
    created_by: Number;
    created_date: Date;
    last_updated_by: Number;
    last_updated_date: Date;

    Creature(creature: Creature) {

    }
}