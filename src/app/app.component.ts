import { Component } from '@angular/core';
import { Creature } from './shared/models/creature';
import { MainService } from './shared/services/main.service';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Creature[] = [];
  selectedCreature: Creature

  races: any[] = []
  raceNames: string[] = []
  backgrounds: any[] = []
  backgroundNames: string[] = []
  creatureTypes: any[] = []
  creatureTypeNames: string[] = []
  creatureSizes: any[] = []
  creatureSizeNames: string[] = []

  newCreatureMode: boolean = false
  newCreatureForm: FormGroup
  editCreatureForm: FormGroup
  selectedCreatureRace: string
  selectedCreatureBackground: string
  selectedCreatureType: string
  selectedCreatureSize: string

  ngOnInit() {
    this.updateCreatureData()
    this.mainService.getRaces().subscribe((res) => {
      this.races = res
      this.races.forEach((race) => {
        this.raceNames.push(race.race_name)
      })
    })
    this.mainService.getBackgrounds().subscribe((res) => {
      this.backgrounds = res
      this.backgrounds.forEach((background) => {
        this.backgroundNames.push(background.background_name)
      })
    })
    this.mainService.getCreatureTypes().subscribe((res) => {
      this.creatureTypes = res
      this.creatureTypes.forEach((creatureType) => {
        this.creatureTypeNames.push(creatureType.creature_type_name)
      })
    })
    this.mainService.getCreatureSizes().subscribe((res) => {
      this.creatureSizes = res
      this.creatureSizes.forEach((creatureSize) => {
        this.creatureSizeNames.push(creatureSize.creature_size_name)
      })
    })
  }

  constructor(private mainService: MainService) {

  }

  updateCreatureData() {
    this.mainService.getAllCreatures().subscribe((res) => {
      this.data = res
    })
  }

  enterNewCreatureMode() {
    this.newCreatureForm = new FormGroup({
      creatureName: new FormControl(),
      race: new FormControl(),
      background: new FormControl(),
      creatureType: new FormControl(),
      creatureSize: new FormControl(),
      armorClass: new FormControl(),
      acType: new FormControl,
      challengeRating: new FormControl(),
      maxHitpoints: new FormControl(),
      speed: new FormControl(),
      climbSpeed: new FormControl(),
      flySpeed: new FormControl(),
      swimSpeed: new FormControl(),
      strScore: new FormControl(),
      dexScore: new FormControl(),
      conScore: new FormControl(),
      intScore: new FormControl(),
      wisScore: new FormControl(),
      chaScore: new FormControl()
    })
    this.newCreatureMode = true;
  }

  submitCreature() {
    let c = new Creature()
    c.creature_id = -1
    c.creature_name = this.newCreatureForm.controls["creatureName"].value
    c.race_id = this.getIdFromRaceName( this.newCreatureForm.controls["race"].value)
    c.background_id = this.getIdFromBackgroundName( this.newCreatureForm.controls["background"].value)
    c.creature_size_id = this.getIdFromSizeName( this.newCreatureForm.controls["creatureSize"].value)
    c.creature_type_id = this.getIdFromTypeName( this.newCreatureForm.controls["creatureType"].value)
    c.armor_class = this.newCreatureForm.controls["armorClass"].value
    c.ac_type = this.newCreatureForm.controls["acType"].value
    c.challenge_rating = this.newCreatureForm.controls["challengeRating"].value
    c.max_hitpoints = this.newCreatureForm.controls["maxHitpoints"].value
    c.current_hitpoints = c.max_hitpoints
    c.temporary_hitpoints = 0
    c.expended_hitdie = "None"
    c.speed = this.newCreatureForm.controls["speed"].value
    c.fly_speed = this.newCreatureForm.controls["flySpeed"].value
    c.climb_speed = this.newCreatureForm.controls["climbSpeed"].value
    c.swim_speed = this.newCreatureForm.controls["swimSpeed"].value
    c.str_score = this.newCreatureForm.controls["strScore"].value
    c.dex_score = this.newCreatureForm.controls["dexScore"].value
    c.con_score = this.newCreatureForm.controls["conScore"].value
    c.int_score = this.newCreatureForm.controls["intScore"].value
    c.wis_score = this.newCreatureForm.controls["wisScore"].value
    c.cha_score = this.newCreatureForm.controls["chaScore"].value
    c.failed_death_saves = 0
    c.passed_death_saves = 0
    c.created_by = -1
    c.created_date = null
    c.last_updated_by = -1
    c.last_updated_date = null
    this.mainService.upsertCreature(c).subscribe((res) => {
      console.log("Create Creature Attempt Made")
      this.updateCreatureData()
    })
    this.leaveNewCreatureMode()
  }

  leaveNewCreatureMode() {
    this.newCreatureMode = false;
  }

  selectCreature(creature: Creature) {
    this.selectedCreatureRace = this.getRaceNameFromId(creature.race_id)
    this.selectedCreatureBackground = this.getBackgroundNameFromId(creature.background_id)
    this.selectedCreatureSize = this.getSizeNameFromId(creature.creature_size_id)
    this.selectedCreatureType = this.getTypeNameFromId(creature.creature_type_id)
    
    this.selectedCreature = creature
    this.editCreatureForm = new FormGroup({
      creatureName: new FormControl(creature.creature_name),
      race: new FormControl(),
      background: new FormControl(),
      creatureType: new FormControl(),
      creatureSize: new FormControl(),
      armorClass: new FormControl(creature.armor_class),
      acType: new FormControl(creature.ac_type),
      challengeRating: new FormControl(creature.challenge_rating),
      maxHitpoints: new FormControl(creature.max_hitpoints),
      currentHitpoints: new FormControl(creature.current_hitpoints),
      temporaryHitpoints: new FormControl(creature.temporary_hitpoints),
      expendedHitDie: new FormControl(creature.expended_hitdie),
      speed: new FormControl(creature.speed),
      climbSpeed: new FormControl(creature.climb_speed),
      flySpeed: new FormControl(creature.fly_speed),
      swimSpeed: new FormControl(creature.swim_speed),
      strScore: new FormControl(creature.str_score),
      dexScore: new FormControl(creature.dex_score),
      conScore: new FormControl(creature.con_score),
      intScore: new FormControl(creature.int_score),
      wisScore: new FormControl(creature.wis_score),
      chaScore: new FormControl(creature.cha_score),
      failedDeathSaves: new FormControl(creature.failed_death_saves),
      passedDeathSaves: new FormControl(creature.passed_death_saves)
    })
  }

  deleteCreature(creature) {
    this.mainService.deleteCreature(creature.creature_id).subscribe((res) => {
      this.updateCreatureData()
    })
  }

  updateCreature() {
    let c = this.selectedCreature
    c.creature_name = this.editCreatureForm.controls["creatureName"].value
    c.race_id = this.getIdFromRaceName( this.editCreatureForm.controls["race"].value)
    c.background_id = this.getIdFromBackgroundName( this.editCreatureForm.controls["background"].value)
    c.creature_size_id = this.getIdFromSizeName( this.editCreatureForm.controls["creatureSize"].value)
    c.creature_type_id = this.getIdFromTypeName( this.editCreatureForm.controls["creatureType"].value)
    c.armor_class = this.editCreatureForm.controls["armorClass"].value
    c.ac_type = this.editCreatureForm.controls["acType"].value
    c.challenge_rating = this.editCreatureForm.controls["challengeRating"].value
    c.max_hitpoints = this.editCreatureForm.controls["maxHitpoints"].value
    c.current_hitpoints = this.editCreatureForm.controls["currentHitpoints"].value
    c.temporary_hitpoints = this.editCreatureForm.controls["temporaryHitpoints"].value
    c.expended_hitdie = this.editCreatureForm.controls["expendedHitDie"].value
    c.speed = this.editCreatureForm.controls["speed"].value
    c.fly_speed = this.editCreatureForm.controls["flySpeed"].value
    c.climb_speed = this.editCreatureForm.controls["climbSpeed"].value
    c.swim_speed = this.editCreatureForm.controls["swimSpeed"].value
    c.str_score = this.editCreatureForm.controls["strScore"].value
    c.dex_score = this.editCreatureForm.controls["dexScore"].value
    c.con_score = this.editCreatureForm.controls["conScore"].value
    c.int_score = this.editCreatureForm.controls["intScore"].value
    c.wis_score = this.editCreatureForm.controls["wisScore"].value
    c.cha_score = this.editCreatureForm.controls["chaScore"].value
    c.failed_death_saves = this.editCreatureForm.controls["failedDeathSaves"].value
    c.passed_death_saves = this.editCreatureForm.controls["passedDeathSaves"].value
    c.last_updated_by = -1
    c.last_updated_date = null
    this.mainService.upsertCreature(c).subscribe((res) => {
      this.mainService.getAllCreatures()
    })
    
    this.leaveEditCreatureMode()
  }

  leaveEditCreatureMode() {
    this.selectedCreature = undefined
  }

  getIdFromRaceName(name) {
    let race = this.races.find((race) => {
      return race.race_name == name
    })
    return race.race_id
  }

  getRaceNameFromId(id) {
    let race = this.races.find((race) => {
      return race.race_id == id
    })
    return race.race_name
  }

  getIdFromBackgroundName(name) {
    let b = this.backgrounds.find((background) => {
      return background.background_name == name
    })
    return b.background_id
  }

  getBackgroundNameFromId(id) {
    let b = this.backgrounds.find((background) => {
      return background.background_id == id
    })
    return b.background_name
  }
  
  getIdFromTypeName(name) {
    let t = this.creatureTypes.find((type) => {
      return type.creature_type_name == name
    })
    return t.creature_type_id
  }
  
  getTypeNameFromId(id) {
    let t = this.creatureTypes.find((type) => {
      return type.creature_type_id == id
    })
    return t.creature_type_name
  }
  
  getIdFromSizeName(name) {
    let s = this.creatureSizes.find((size) => {
      return size.creature_size_name == name
    })
    return s.creature_size_id
  }

  getSizeNameFromId(id) {
    let s = this.creatureSizes.find((size) => {
      return size.creature_size_id == id
    })
    return s.creature_size_name
  }
}
