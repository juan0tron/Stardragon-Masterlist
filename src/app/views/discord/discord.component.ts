import { Component }  from '@angular/core';

@Component({
  selector: 'discord',
  templateUrl: './discord.template.html',
  providers: []
})
export class DiscordComponent {

  title = 'Discord Server';

  public rules = [
    {
      rule:        "No sexist, religious, or racist jokes please.",
      description: "",
    },
    {
      rule:        "Keep it civil!",
      description: "While religion and politics are the two big no-nos when it comes to talk around the Thanksgiving table, we’ll accept it but if things get too heated, the admins reserve the rights to stop the discussion, or ask it to be moved to Private Messages. (But also try being mindful yourselves and we’ll avoid admins getting involved!)",
    },
    {
      rule:        "No real life animal abusegore. And on that note, no real life human abuse/gore either. ",
      description: "The death and mutilation of REAL creatures is not, by any means, funny or something to make light of. Those are real creatures with real feelings, and real fears. Their horror is not our comedy.",
    },
    {
      rule: "No pedophilia related talk or pictures. Be it real children or fictional children. ",
      description: "Might want to avoid any dark humor in regards to children all together honestly. We have many parents in GemExchange, and it’s not exactly tasteful for parents to see such things.",
    },
    {
      rule:"Keep micromodding to a minimum.",
      description:"Sometimes the admins are sleeping/away, and you can’t get a hold of them and something needs to be done, we understand. But if the admins are around and just not aware of something going down in a room, PLEASE let the admins know. One admin speaking to someone is better than several minimodders talking to someone.",
    },
    {
      rule:"Be nice!",
      description:"We’re fine with debates and playful bickering, but when things become legitimate arguments, you’re gunna have a bad time. Additionally, sometimes sarcasm and jokes are hard to ‘hear’ over the internet. Be patient if someone misinterprets what you’re trying to say.",
    },
    {
      rule: "Non-StarDragon discussion is allowed.",
      description: "You’re free to post pictures of other species that are not StarDragons. You’re free to have full on discussions of non-StarDragon species too! The only areas this is not allowed is in StarDragon-only rooms (IE: RP rooms, RP discussion rooms, character discussion rooms, world building rooms)."
    },
    {
      rule:"Look after yourselves!",
      description:"If you see something that makes you uncomfortable in the NSFW room ( #sinnerschurch ), and the conversation going on does not break any rules, we suggest you head back to the general chat until the conversation dies down. The chatroom is labeled mature for a reason, and we have these separate chats so that people have specific rooms to speak in without upsetting those who are just here for general discussions."
    }
  ];
  public roles = [
    {
      name:        "Sour Cream",
      description: "Rynies (DeletetheStars)"
    },
    {
      name:        "Inside the Bun",
      description: "Users that have been grounded.",
    },
    {
      name:        "Cheesy Gordita Crunch",
      description: "Admins",
    },
    {
      name:        "Doritos locos tacos",
      description: "Moderators",
    },
    {
      name:        "Little Burritos",
      description: "Users that have at least one StarDragon.",
    },
    {
      name:        "Waiting Line",
      description: "Users that don't have a StarDragon yet.",
    },
    {
      name:        "Beefy 5 Layer Burrito",
      description: "Creativity team",
    }
  ];

  constructor(){}

  ngOnInit(){}
}
