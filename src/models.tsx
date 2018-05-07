export class Software {
    id: string;
    name: string;
    description: string;
    releaseNotes: Array<ReleaseNote> = [];
}

export class ReleaseNote {
    versionNumber: string;
    summary: string;
    features: Array<Feature> = [];
    bugfixes: Array<Bugfix> = [];
}

export class Feature {
    description: string;
    rating: number;
}

export class Bugfix {
    description: string;
    rating: number;
}

