//base
const Discord = require('discord.js'); 
 const client = new Discord.Client(); var prefix = "%"; 
 
client.login('token');

//invite
client.on('message',message=>{
  if(message.content === "%help"){
    message.channel.sendMessage('----------`moderation`----------')
    message.channel.sendMessage('**:no_entry: ban :no_entry:** = `%ban + utilisateur`')
    message.channel.sendMessage('**:x: Kick :x:** = `%kick + utilisateur`')
    message.channel.sendMessage('**:mute: Mute :mute:** = `%mute + utilisateur`')
    message.channel.sendMessage('**:recycle: supprimer entre 1 et 100** :recycle: = `%clear + nombres de message`')
    message.channel.sendMessage('---------``fun``----------')
    message.channel.sendMessage('**:8ball: 8ball :8ball:** = `%8ball + votre message`')
    message.channel.sendMessage('**:tada: faire un event** :tada: = `%event + le nom de votre event`')
    message.channel.sendMessage('**:musical_note: Musique** :musical_note: = `pas encore disponible`')
    message.channel.sendMessage('---------`invitation`---------')
    message.channel.sendMessage('**:link: Inviter le bot :link:** = `%lien`')
  }
}
)

//anti insulte
client.on('message',message=>{
  if(message.content === "Putain")
  message.channel.sendMessage(':x: **insulte interdite** :x:')
  
}
)
//ban
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("member.user.username vous ne pouvez pas bannir cette personne :x: ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :sad:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :x:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + ':no_entry: banni :no_entry:')
    }
});
//mute//supprimer
client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande :x:")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }

    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande :no_entry")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce **membre** :x:")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce **membre** :x:")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été **mute** :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})
//kick
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la **permission** d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un **utilisateur** :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas **kick** cet **utilisateur** :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas **exclure** cet **utilisateur** :x:")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été **exclu** :white_check_mark:')
    }
});

//8bal
client.on('message',message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
   
    if (args[0].toLocaleLowerCase() === prefix + '8ball'){
        if (!args[0]) return message.channel.send("Veuillez **poser une question** :x:")
        let rep = ["Non :x:", "J'ai envie de dormir :zzz:", "Balec :face_palm:", "Peut être... :thinking:", "Absolument :interrobang:","oui"];
        let reptaille = Math.floor((Math.random() * rep.length));
        let question = args.slice(0).join(" ");
 
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setColor("RED")
            .addField("Question:", question)
            .addField("Réponse:", rep[reptaille]);
        message.channel.send(embed)
    }
})

//lien
client.on("message",message=>{
  if(message.content === "%lien"){
    message.channel.sendMessage('ok tu veus lien pour inviter le bot sur un autre serveur tien le voila :white_check_mark:')
message.channel.sendMessage('https://discordapp.com/oauth2/authorize?client_id=564202405768462351&scope=bot&permissions=8')
  }
}
)


//event perso
client.on('message',message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
   
    if (args[0].toLocaleLowerCase() === prefix + 'event'){
       
        
        
        let question = args.slice(0).join(" ");
 
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setColor("GREEN")
            .addField("event:", question)
          
        message.channel.send(embed)
    }
})

