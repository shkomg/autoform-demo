if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
Meteor.methods({

    newFollowerEmail: function (username) {

        var text = Meteor.user().username+' is now following you! Check your new follower profile here: '+Meteor.settings.public.url+'user/'+Meteor.user().username;

        this.unblock();

        return Email.send({
            to: currentUserEmail({username:username}),
            subject: "You got new follower on "+Meteor.settings.public.marketplaceName+' ('+Meteor.settings.public.url+')',
            text: text
        });


    }
  });


}

Emails = new Mongo.Collection('emails');

Schema={};

Schema.emails = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email"
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    }
});

Emails.attachSchema(Schema.emails);

