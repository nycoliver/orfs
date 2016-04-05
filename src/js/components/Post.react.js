var React = require('react');
var moment = require('moment');

var Link = require('react-router').Link

var AudioPlayer = require('./AudioPlayer.react')
var Avatar = require('./Avatar.react');
var Markdown = require('react-remarkable');

var ProfileStore = require('../stores/ProfileStore')
var PeerStore = require('../stores/ProfileStore')

var Post = React.createClass({
  displayName: "Post",
  propTypes: {
    content: React.PropTypes.array.isRequired,
  },
  render: function() {
    if (!this.props.content)
      return null
    const post = this.props.content.map(function(content, index) {
      if (content.type == "audio/mp3")
        return <AudioPlayer
          artwork={content.artwork}
          src={"http://localhost:8080/ipfs/" + content.hash}
          title={content.title}
          artist={content.artist}
          preload='none'
          key={index} />

      else if (content.type == "image/jpg" || content.type == "image/jpeg" || content.type == "image/gif" || content.type == "image/png")
        return <img className="w-100" src={'http://localhost:8080/ipfs/' + content.hash} key={index} ></img>

      else if (content.type == "text/plain")
        return <div id="text" className="serif"><Markdown source={content.hash} key={index} /></div>
    })

    var dateString = moment.unix(this.props.date).fromNow(); //format("ddd, hA");

    return (
      <div id="post" className={"mw5 mb4 center overflow-visible"}>
        <div id="author" className=' w-100 mw4 fl relative'>
          <div className="w4 h4 br3 fl ma0 overflow-hidden">
            <Avatar image={this.props.avatar}/>
          </div>
          <Link id="username" className="fw6 fr no-underline w5" to={"@" + this.props.author}>
            <p className={"f4 mv2 black-90 fr lh2"}>{this.props.username}</p>
            {
              // if (this.props.verified == "verified")
                <svg id="verified" className="h-15 w-15 fl pv2 ph2 fr " fill="#408" viewBox="0 0 16 16" height="23" width="23" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.67 7.06l-1.08-1.34c-0.17-0.22-0.28-0.48-0.31-0.77l-0.19-1.7c-0.08-0.7-0.63-1.25-1.33-1.33l-1.7-0.19c-0.3-0.03-0.56-0.16-0.78-0.33l-1.34-1.08c-0.55-0.44-1.33-0.44-1.88 0l-1.34 1.08c-0.22 0.17-0.48 0.28-0.77 0.31l-1.7 0.19c-0.7 0.08-1.25 0.63-1.33 1.33l-0.19 1.7c-0.03 0.3-0.16 0.56-0.33 0.78l-1.08 1.34c-0.44 0.55-0.44 1.33 0 1.88l1.08 1.34c0.17 0.22 0.28 0.48 0.31 0.77l0.19 1.7c0.08 0.7 0.63 1.25 1.33 1.33l1.7 0.19c0.3 0.03 0.56 0.16 0.78 0.33l1.34 1.08c0.55 0.44 1.33 0.44 1.88 0l1.34-1.08c0.22-0.17 0.48-0.28 0.77-0.31l1.7-0.19c0.7-0.08 1.25-0.63 1.33-1.33l0.19-1.7c0.03-0.3 0.16-0.56 0.33-0.78l1.08-1.34c0.44-0.55 0.44-1.33 0-1.88zM6.5 12L3 8.5l1.5-1.5 2 2 5-5 1.5 1.55-6.5 6.45z"/>
                </svg>
              // if (this.props.verified == "changed")
                // <svg id="nameChanged" className="h-15 w-15 fl pv2 ph2 fr " fill="#f00" viewBox="0 0 16 16" height="23" width="23" xmlns="http://www.w3.org/2000/svg">
                //   <path d="M15.72 12.5l-6.85-11.98C8.69 0.21 8.36 0.02 8 0.02s-0.69 0.19-0.87 0.5l-6.85 11.98c-0.18 0.31-0.18 0.69 0 1C0.47 13.81 0.8 14 1.15 14h13.7c0.36 0 0.69-0.19 0.86-0.5S15.89 12.81 15.72 12.5zM9 12H7V10h2V12zM9 9H7V5h2V9z" />
                // </svg>
            }
          </Link>

          <Link id="date" className={"mb1 fr"} to={"post/"+this.props.id}>
            <p className={"mv0 h1 fw5 f5 fr tr black-60"}>{dateString}</p>
          </Link>
        </div>

        <div id="post-body" className="mh3 fl w-100 mw5 f6">
          {post}
          <ul id="tags" className="list ma0 pv1 ph0 f6 gray mw5 overflow-hidden">

          </ul>
        </div>
        <div id="actions" className="relative fl mw2">
          <ul className="list ma0 pa0">
            <li id="pin" className="mb2">
              <a href={'#'} download={this.props.title} title="Pin">
                <svg className="mh1" viewBox="0 0 20 20" height="26" width="26" fill="#000" xmlns="http://www.w3.org/2000/svg">
                  <path className="icon" d="M10 1.2v0.8l0.5 1-4.5 3H2.2c-0.44 0-0.67 0.53-0.34 0.86l3.14 3.14L1 15l5-4 3.14 3.14c0.33 0.33 0.86 0.09 0.86-0.34V10l3-4.5 1 0.5h0.8c0.44 0 0.67-0.53 0.34-0.86L10.86 0.86c-0.33-0.33-0.86-0.09-0.86 0.34z"/>
                </svg>
              </a>
            </li>
            <li id="download" className="mv2">
              <a href={'http://localhost:8080/ipfs/' + this.props.hash} download={this.props.title} title="Download">
                <svg className="mh1" viewBox="0 0 20 20" height="26" width="26" fill="#000" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 13h2l-3 3-3-3h2V8h2v5z m3-8c0-0.44-0.91-3-4.5-3-2.42 0-4.5 1.92-4.5 4C1.02 6 0 7.52 0 9c0 1.53 1 3 3 3 0.44 0 2.66 0 3 0v-1.3H3C1.38 10.7 1.3 9.28 1.3 9c0-0.17 0.05-1.7 1.7-1.7h1.3v-1.3c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2h1.3c0.81 0 2.7 0.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2H10v1.3c0.38 0 1.98 0 2 0 2.08 0 4-1.16 4-3.5 0-2.44-1.92-3.5-4-3.5z"/>
                </svg>
              </a>
            </li>
            <li id="delete" className="mv2">
              <a href={'#'} download={this.props.title} title="Delete">
                <svg className="mh1" viewBox="0 0 15 20" height="26" width="26" fill="#000" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2H8c0-0.55-0.45-1-1-1H4c-0.55 0-1 0.45-1 1H1c-0.55 0-1 0.45-1 1v1c0 0.55 0.45 1 1 1v9c0 0.55 0.45 1 1 1h7c0.55 0 1-0.45 1-1V5c0.55 0 1-0.45 1-1v-1c0-0.55-0.45-1-1-1z m-1 12H2V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9z m1-10H1v-1h9v1z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  // render: function() {
  //   var dateString = moment.unix(this.props.date).fromNow(); //format("ddd, hA");
  //   var content;
  //   var type = this.props.type;
  //
  //   var text = '[MOTHERBOARD: THE APPLE-FBI ENCRYPTION HEARING WAS UNEXPECTEDLY HOSTILE TO THE FBI DIRECTOR](http://motherboard.vice.com/read/the-apple-fbi-encryption-hearing-judiciary-committee-fbi-director-james-comey) \n\nSarah Jeong, reporting for Motherboard: \n\n > A couple of representatives were openly hostile to Comey, but most launched passive aggressive, loaded questions at the FBI director. Even though the representatives (both Democrats and Republicans) were mostly polite, the tone of the the questioning was a huge departure from how the House Judiciary Committee typically addresses Comey. \n\n > “I would be deeply disappointed if it turns out the government is found to be exploiting a national tragedy to pursue a change in the law,” Rep. John Conyers (D-MI) told Comey. […] \n\n > The questions got more hostile. Rep. Conyers asked Comey if the San Bernardino case was an “end-run around this committee” — a loaded question that Comey of course denied. […]\n\n\n\n > After that, Rep. Darrell Issa (R-CA) opened his questioning by quoting the late Justice Antonin Scalia: “There is nothing new in the realization that the Constitution sometimes insulates the criminality of a few in order to protect the privacy of all of us.” Issa’s questioning was overtly hostile in tone, delving deep into the technical details of the iPhone 5c. Comey was at loss, admitting, “I have not answered the questions you have asked me today and I am not entirely sure I understand the questions.”\n\n > Rep. Zoe Lofgren (D-CA) then said to Comey, “As I was hearing your opening statement talking about a world where everything is private, it may be the alternative is a world where nothing is private. Because once you have holes in encryption, the question is not if but when those holes will be exploited.” \n\n I’m actually not surprised at the hostility toward Comey. Democrats tend to support civil liberties against overreach from law enforcement, and Republicans — especially those in today’s House of Representatives — are extremely skeptical of an ever-more-powerful federal government. And both Republicans and Democrats yesterday seemed aware that the FBI’s use of the All Writs Act is, as Conyers put it, “an end-run around” Congress. \n\n If there’s one thing that can unite both parties in today’s polarized Congress, it is the protection of congressional authority. The idea that the Department of Justice (which is part of the Executive Branch) and the Judicial Branch could dictate the terms of this debate is not going to fly. \n\n **UPDATE:** To be clear, there was also hostility toward Apple. That was expected by everyone. Some congresspeople are card-carrying members of the [Golden Key Wizard Society](https://sixcolors.com/link/2016/02/new-member-of-the-golden-key-wizard-society/).'
  //
  //   if (type == "audio/mp3")
  //     content = <AudioPlayer artwork={this.props.artwork} src={"http://localhost:8080/ipfs/" + this.props.id} title={this.props.title} artist={this.props.artist} preload='none'/>
  //
  //   else if (type == "image/jpg" || type == "image/jpeg" || type == "image/gif" || type == "image/png")
  //     content = <img src={'http://localhost:8080/ipfs/' + this.props.id}></img>
  //
  //   else if (type == "text/plain")
  //     content = <div id="text" className="serif"><Markdown source={text} /></div>
  //
  //   if (!content)
  //     return null
  //
  //   var avatarUrl = (this.props.image) ? "url('http://localhost:8080/ipfs/" + this.props.avatar + "')" : null;
  //
  //   return (
  //     <div id="post" className={"mw5 mb4 center overflow-visible "+type}>
  //       <div id="author" className=' w-100 mw4 h5 fl relative'>
  //         <div className="w4 h4 br3 fl ma0 overflow-hidden">
  //           <Avatar image={this.props.avatar}/>
  //         </div>
  //         <Link id="username" className="fw6 fr no-underline w5" to={"@" + this.props.author}>
  //           <p className={"f4 mv2 black-90 fr lh2"}>{this.props.username}</p>
  //           <svg className="h-15 w-15 fl pv2 ph2 fr " fill="#408" viewBox="0 0 16 16" height="23" width="23" xmlns="http://www.w3.org/2000/svg">
  //             <path d="M15.67 7.06l-1.08-1.34c-0.17-0.22-0.28-0.48-0.31-0.77l-0.19-1.7c-0.08-0.7-0.63-1.25-1.33-1.33l-1.7-0.19c-0.3-0.03-0.56-0.16-0.78-0.33l-1.34-1.08c-0.55-0.44-1.33-0.44-1.88 0l-1.34 1.08c-0.22 0.17-0.48 0.28-0.77 0.31l-1.7 0.19c-0.7 0.08-1.25 0.63-1.33 1.33l-0.19 1.7c-0.03 0.3-0.16 0.56-0.33 0.78l-1.08 1.34c-0.44 0.55-0.44 1.33 0 1.88l1.08 1.34c0.17 0.22 0.28 0.48 0.31 0.77l0.19 1.7c0.08 0.7 0.63 1.25 1.33 1.33l1.7 0.19c0.3 0.03 0.56 0.16 0.78 0.33l1.34 1.08c0.55 0.44 1.33 0.44 1.88 0l1.34-1.08c0.22-0.17 0.48-0.28 0.77-0.31l1.7-0.19c0.7-0.08 1.25-0.63 1.33-1.33l0.19-1.7c0.03-0.3 0.16-0.56 0.33-0.78l1.08-1.34c0.44-0.55 0.44-1.33 0-1.88zM6.5 12L3 8.5l1.5-1.5 2 2 5-5 1.5 1.55-6.5 6.45z"/>
  //           </svg>
  //         </Link>
  //
  //         <Link id="date" className={"mb1 fr"} to={"post/"+this.props.id}>
  //           <p className={"mv0 h1 fw5 f5 fr black-60"}>{dateString}</p>
  //         </Link>
  //       </div>
  //
  //       <div id="post-body" className="mh3 fl w-100 mw5 f6">
  //         {content}
  //         <ul id="tags" className="list ma0 pv1 ph0 f6 gray mw5 overflow-hidden">
  //           <li className="di mr1">
  //             <Link className="no-underline" to={"/tag/" + ""}>
  //               <p className={"di gray"}>harumi</p>
  //             </Link>,
  //           </li>
  //           <li className="di mr1">
  //             <Link className="no-underline" to={"/tag/" + ""}>
  //               <p className={"di gray"}>japan</p>
  //             </Link>,
  //           </li>
  //           <li className="di mr1">
  //             <Link className="no-underline" to={"/tag/" + ""}>
  //               <p className={"di gray"}>1960s</p>
  //             </Link>,</li>
  //           <li className="di mr1">
  //             <Link className="no-underline" to={"/tag/" + ""}>
  //               <p className={"di gray"}>rock</p>
  //             </Link>,</li>
  //           <li className="di mr1">
  //             <Link className="no-underline" to={"/tag/" + ""}>
  //               <p className={"di gray"}>psychedelic</p>
  //             </Link>,</li>
  //           <li className="di">
  //             <Link className="no-underline" to={"/tag/" + ""}>
  //               <p className={"di gray"}>tom.wilson</p>
  //             </Link>
  //           </li>
  //         </ul>
  //       </div>
  //       <div id="actions" className="relative fl mw2">
  //         <ul className="list ma0 pa0">
  //           <li id="pin" className="mb2">
  //             <svg className="mh1" viewBox="0 0 20 20" height="26" width="26" fill="#000" xmlns="http://www.w3.org/2000/svg">
  //               <path className="icon" d="M10 1.2v0.8l0.5 1-4.5 3H2.2c-0.44 0-0.67 0.53-0.34 0.86l3.14 3.14L1 15l5-4 3.14 3.14c0.33 0.33 0.86 0.09 0.86-0.34V10l3-4.5 1 0.5h0.8c0.44 0 0.67-0.53 0.34-0.86L10.86 0.86c-0.33-0.33-0.86-0.09-0.86 0.34z"/>
  //             </svg>
  //           </li>
  //           <li id="download" className="mv2">
  //             <a href={'http://localhost:8080/ipfs/' + this.props.id} download={this.props.title} title="Download">
  //               <svg className="mh1" viewBox="0 0 20 20" height="26" width="26" fill="#000" xmlns="http://www.w3.org/2000/svg">
  //                 <path d="M9 13h2l-3 3-3-3h2V8h2v5z m3-8c0-0.44-0.91-3-4.5-3-2.42 0-4.5 1.92-4.5 4C1.02 6 0 7.52 0 9c0 1.53 1 3 3 3 0.44 0 2.66 0 3 0v-1.3H3C1.38 10.7 1.3 9.28 1.3 9c0-0.17 0.05-1.7 1.7-1.7h1.3v-1.3c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2h1.3c0.81 0 2.7 0.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2H10v1.3c0.38 0 1.98 0 2 0 2.08 0 4-1.16 4-3.5 0-2.44-1.92-3.5-4-3.5z"/>
  //               </svg>
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   )
  // }
})

module.exports = Post;
