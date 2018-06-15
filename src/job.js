class Job {
    constructor(name, modifiers) {
        this.name = name;
        this.modifiers = modifiers;
    }
}
function getJob()
{
    let jobs = {
        Knight: [
            new Upgrade('', Unit, "attack", 90),
            new Upgrade('', Unit, "defense", 115)
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