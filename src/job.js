class Job {
    constructor(name, modifiers) {
        this.name = name;
        this.modifiers = modifiers;
    }
}
function generateJob()
{
    let jobs = {
        Knight: [
            new Upgrade('', Unit, "attack", 90),
            new Upgrade('', Unit, "defense", 115)
        ],
        "Warrior Priest": [
            new Upgrade('', Unit, "attack", 75),
            new Upgrade('', Unit, "defense", 130)
        ],
        Scolar: [
            new Upgrade('', Unit, "attack", 75),
            new Upgrade('', Unit, "defense", 75),
            new Upgrade('', Unit, "xp", 150),
        ],
        Assassin: [
            new Upgrade('', Unit, "attack", 115),
            new Upgrade('', Unit, "defense", 90)
        ],
        Adventurer: []
    };
    let names = Object.keys(jobs);
    let name = names[Math.floor(Math.random()*names.length)];
    return new Job(name, jobs[name]);
}
