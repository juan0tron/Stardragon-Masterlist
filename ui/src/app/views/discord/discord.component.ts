import { Component }  from '@angular/core';

@Component({
  selector: 'discord',
  templateUrl: './discord.template.html',
  providers: []
})
export class DiscordComponent {

  title = 'Discord Server';

  public discord_channels = [
    {
      name:        "AdminAnnouncements",
      description: "Admins are able to post here, however we’ve disabled the ability for anyone else to speak. This is where admins make various important updates."
    },
    {
      name:        "AskTheAdmins",
      topic:       "Allows non-StarDragons",
      description: " Questions for the ADMINS. Be it a question ABOUT the Admins, or about the StarDragon world or... whatever else you have in mind. To prevent any confusion or misinformation, please refrain from answering any questions posted in here unless you are, obviously, an admin."
    },
    {
      name:        "Gemeral",
      topic:       "Allows non-StarDragons",
      description: "Channel for miscellaneous discussions. Feel free to talk about whatever, just keep it SFW."
    },
    {
      name:        "ArtCorner",
      topic:       "Allows non-StarDragons",
      description: "Channel for you to post your art, or art you got commissioned! You’re free to have discussions about that art as well! This room is not just, ‘post art then get out!’"
    },
    {
      name:        "MemeCorner",
      topic:       "Allows non-StarDragons",
      description: "Channel for y’all to post your weird meme jokes, ya crazy kids."
    },
    {
      name:        "AnxietyCorner",
      topic:       "Allows non-StarDragons",
      description: "Channel for your stress. Real life sucks, and sometimes you just need somewhere to get it out. Feel free to vent your concerns and frustrations here."
    },
    {
      name:        "CuddleCorner",
      topic:       "Allows non-StarDragons",
      description: "To post all your cutesy pictures for people to look at and maybe find some peace from the day. We like to post cute animal pictures in here."
    },
    {
      name:        "AdvertisementCorner",
      topic:       "StarDragons PREFERRED",
      description: "Place for you to post your sales, trades, commissions, what ever. We’d PREFER it to be StarDragon related, but not mandatory. If we feel that someone is posting non-Stardragon related ads too frequently, we will ask them to take it easy."
    },
    {
      name:        "SinnerChurch",
      topic:       "Allows non-StarDragons",
      description: "FOR NSFW art and conversations. NSFW means porn, gore, violence, and things related. Keep in mind, we do NOT allow REAL LIFE gore or violence. Real life porn is okay, however you may not post nsfw pictures of yourself. You're more than welcome to talk about your personal experiences, but keep the sexting to private DMs ya filthy hooligans."
    },
    {
      name:        "CharacterDiscussion",
      topic:       "StarDragons ONLY",
      description: "Talk about your characters! Tell us about your characters! Get to know everyone’s characters and build relationships."
    },
    {
      name:        "StarDragonTinder",
      topic:       "StarDragons ONLY",
      description: "For those who are more interested in looking for intimacy and dating opportunities for their StarDragons. ;)"
    },
    {
      name:        "RPDiscussions",
      topic:       "StarDragons ONLY",
      description: "To discuss the RPs going on. Remember, out of character communication is key!"
    },
    {
      name:        "Roleplay_(Name)",
      topic:       "StarDragons ONLY",
      description: "Roleplay rooms! The RP rooms have names that generally explain the topic of the room. Feel free to make an RP, or join in if one is already going!"
    },
  ];
  public rules = [
    {
      rule:"No sexist, religious, or racist jokes.",
      description:"",
    },
    {
      rule:        "Keep it civil!",
      description: "While religion/politics are the two big no-nos when it comes to talk around the Thanksgiving table, we’ll accept it but if things get too heated, the admins reserve the rights to stop the discussion, or ask it to be moved to Private Messages. (But also try being mindful yourselves and we’ll avoid admins getting involved!)",
    },
    {
      rule: "No real life animal abuse/gore. No real life human abuse/gore either. ",
      description:"Artistic guro/gore should be kept exclusively to the NSFW room and behind brackets and warnings. The death and mutilation of REAL creatures is not, by any means, funny or something to make light of. Those are real creatures with real feelings, and real fears. Their horror is not our comedy.",
    },
    {
      rule: "No pedophilia related talk or pictures. Be it real children or fictional children. ",
      description: "Might want to avoid any dark humor in regards to children all together honestly. We have many parents in GemExchange, and it’s not exactly tasteful for parents to see such things. <br/></br> That being said, something for RP discussion specifically is okay (IE: Your character was abused as a child, or the village your character lived in was pillaged and children died.)",
    },
    {
      rule:"Keep micromodding to a minimum.",
      description:"We understand intervening during the rare times when no admins are online, but if there is an issue and the admins are not already handling it, please let one of them know. It is their job to resolve issues, multiple people jumping in to 'help' will overwhelm and agitate a situation. <br/><br/> PLEASE keep in mind everyone is human and mistakes happen. People are FAR more willing to listen and learn when someone sits them down and speaks to them politely. When multiple people are talking to one person, they start to feel attacked and sometimes attack back.",
    },
    {
      rule:"Be nice!",
      description:" We’re fine with debates and playful bickering, but when things become legitimate arguments, you’re gunna have a bad time. Additionally, sometimes sarcasm and jokes are hard to ‘hear’ over the internet. Be patient if someone misinterprets what you’re trying to say.<br/><br/>The admins are not referees or therapists. Please try and keep disagreements civil and handle issues like adults. This is a big group, so play nice.",
    },
    {
      rule: "Non-StarDragon discussion is allowed.",
      description: "You’re free to post pictures of other species that are not StarDragons. You’re free to have full on discussions of non-StarDragon species too! The only areas this is not allowed is StarDragon only rooms (IE: RP rooms, RP discussion rooms, character discussion rooms, world building rooms)"
    }
  ];
  public discord_layout = [
    {
      img:         "http://orig05.deviantart.net/bedd/f/2017/145/a/d/screen__2017_05_26_3477_by_milay-dbafjms.jpg",
      description: "Turn off notifications for that room",
    },
    {
      img:         "http://orig03.deviantart.net/3c8f/f/2017/145/c/f/screen__2017_05_26_3478_by_milay-dbafjmo.jpg",
      description: "Lets you see what important information is pinned in that room",
    },
    {
      img:         "http://orig15.deviantart.net/f4f5/f/2017/145/0/c/screen__2017_05_26_3479_by_milay-dbafjmh.jpg",
      description: "Toggles the list of people who are in the room",
    },
    {
      img:         "http://orig11.deviantart.net/f746/f/2017/145/1/4/screen__2017_05_26_3480_by_milay-dbafjmb.jpg",
      description: "Allows you to search for things said in all the rooms, depending on what you type in",
    },
    {
      img:         "http://orig15.deviantart.net/4200/f/2017/145/5/0/screen__2017_05_26_3481_by_milay-dbafjm6.jpg",
      description: "Allows you to easily see who notified you and see if it was @ everyone, or @ you specifically (located in left sidebar menu on mobile)",
    },
    {
      img:         "http://orig06.deviantart.net/229a/f/2017/145/a/a/screen__2017_05_26_3482_by_milay-dbafjm3.jpg",
      description: "Ask Discord themselves if you still need help finding something!",
    },
    {
      img:         "http://orig05.deviantart.net/b947/f/2017/145/3/e/screen__2017_05_26_3485_by_milay-dbafn9q.jpg",
      description: "Put these brackets on either side of a link to keep the link from showing preview images. Please use these for potentially graphic and/or triggering images (e.g. spiders)",
    },
    {
      img:         "http://orig03.deviantart.net/0ae9/f/2017/145/e/d/screen__2017_05_26_3483_by_milay-dbafjly.jpg",
      description: ":emojis:, or the emoji face to the right of your text box = Lets you find all the emojis!",
    },
    {
      img:         "http://orig12.deviantart.net/ddfe/f/2017/145/7/1/screen__2017_05_26_3484_by_milay-dbafjlv.jpg",
      description: "Hover over your post and click the three dots (on mobile hold down on your post for a few moments) toedit or delete your message",
    },
  ];
  public roles = [
    {
      name:        "Sour Cream",
      color:       "#e32260",
      description: "Ryn"
    },
    {
      name:        "Inside the Bun",
      color:       "orange",
      description: "Users that have been grounded.",
    },
    {
      name:        "Cheesy Gordita Crunch",
      color:       "#b550df",
      description: "Admins",
    },
    {
      name:        "Doritos locos tacos",
      color:       "#b487ff",
      description: "Moderators",
    },
    {
      name:        "Little Burritos",
      color:       "#3fc8f1",
      description: "Users that have at least one StarDragon.",
    },
    {
      name:        "Waiting Line",
      color:       "#3c99b6",
      description: "Users that don't have a StarDragon yet.",
    },
    {
      name:        "Beefy 5 Layer Burrito",
      color:       "#FFCC00",
      description: "¯\\_(ツ)_/¯",
    }
  ];

  constructor(){}

  ngOnInit(){}
}
