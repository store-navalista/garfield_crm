import { SD_union } from '../../helpers/SD'
import { default as ABOUT } from './ABOUT.json'
import { default as BOOKLETS } from './BOOKLETS.json'
import { default as BROCH } from './BROCH.json'
import { default as BWTS } from './BWTS.json'
import { default as CAREERS } from './CAREERS.json'
import { default as CARGO } from './CARGO.json'
import { default as CERTS } from './CERTS.json'
import { default as CONDSURV } from './CONDSURV.json'
import { default as CONTACTS } from './CONTACTS.json'
import { default as EEXI } from './EEXI.json'
import { default as ERS } from './ERS.json'
import { default as HOME } from './HOME.json'
import { default as IHM } from './IHM.json'
import { default as INSTRUCTIONS } from './INSTRUCTIONS.json'
import { default as LEGALADV } from './LEGALADV.json'
import { default as MACHINERY } from './MACHINERY.json'
import { default as REPAIR } from './REPAIR.json'
import { default as SCANSURV } from './SCANSURV.json'
import { default as SCANSURVCIV } from './SCANSURVCIV.json'
import { default as SD } from './SD.json'
import { default as SHIPREG } from './SHIPREG.json'
import { default as TECHADV } from './TECHADV.json'
import { default as TONNAGE } from './TONNAGE.json'
import { default as TOWAGE } from './TOWAGE.json'
import { default as UTM } from './UTM.json'
import { default as WORKS } from './WORKS.json'

export default {
   services: {
      BOOKLETS,
      BWTS,
      CARGO,
      CONDSURV,
      EEXI,
      ERS,
      IHM,
      LEGALADV,
      MACHINERY,
      REPAIR,
      SCANSURV,
      SCANSURVCIV,
      SD: SD_union(SD),
      SHIPREG,
      TECHADV,
      TONNAGE,
      TOWAGE,
      UTM
   },
   pages: { HOME, ABOUT, CONTACTS, CERTS, BROCH, CAREERS, INSTRUCTIONS, WORKS }
}
