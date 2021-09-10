export class Immersion {
    _id!: number;
    startHour!: number;
    startMinut!: number;
    endHour!: number;
    endMinut!: number;
    visibility!: string;
    comments!: string;
    entry!: string;
    seaConditions!: string;
    waterType!: string;
    place!: {
      name: string;
      latitude: number;
      longitude: number;
    };
    date!: { 
        type: Date;
    }
    inicialBar!: number;
    finalBar!: number;
    weight!: number;
    neopreneThickness!: number;
    air!: { 
        type: Boolean;
        default: true; 
    };
    nitroxPercentage!: number;
    tankAirLiters!: number;
    waterTemperature!: number;
    airTemperature!: number;
    immersionStages!:Object []
    // {
    //     deep: number,,
    //     bottomMinuts: number,
    // }
    buddies!: Object []
    // {
    //     buddie: number;
    //     supervisor: Boolean; 
    // }
    pictures!: Object [];
    // { url: string }]
}