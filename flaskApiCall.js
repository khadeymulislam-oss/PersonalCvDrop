// function scrapingJobPosts(cls) {
//    const API_URL = "http://127.0.0.1:5000/scrape_post";
//    const jobPosts= document.querySelectorAll('.'+cls )
//    jobPosts.forEach(posts => {
//         console.log(posts.textContent.trim())
//         let allText = posts.textContent.trim();
//         const desig = allText.match(/Senior|Sr./g);
//         const apex = allText.match(/Oracle|Apex|Oracle Apex/g);
//         const plsql = allText.match(/PL\/SQL|Plsql|Pl Sql|PL SQL/g);
//         const support = allText.match(/Support|Application Support|Application support/g);

//         let title = '';
//         if(desig && apex){
//             title = 'Application for the post of Senior Oracle APEX Developer'
//         } else if(apex){
//             title = 'Application for the post of Oracle APEX Developer'
//         } else if(desig && plsql){
//             title = 'Application for the post of Senior PL/SQL Developer'
//         } else if(plsql){
//             title = 'Application for the post of PL/SQL Developer'
//         } else if(desig && support){
//             title = 'Application for the post of Application Support Analyst'
//         }
//          const mail = posts.querySelector('a')? posts.querySelector('a').textContent.trim() : '';
         

//          fetch(API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ title, mail })
//         })
//         .then(res => res.json())
//         .then(data => console.log('Sent:', data))
//         .catch(err => console.error('Error:', err));
//    })

// }
function scrapingJobPosts(cls) {
  const API_URL = "http://127.0.0.1:5000/scrape_post";
  const jobPosts = document.querySelectorAll("." + cls);

  jobPosts.forEach(post => {
    const allText = post.textContent.trim();
    console.log(allText);

    const desig = allText.match(/Senior|Sr\./gi);
    const apex = allText.match(/Oracle|Apex|Oracle Apex/gi);
    const plsql = allText.match(/PL\/SQL|Plsql|Pl Sql|PL SQL/gi);
    const support = allText.match(/Support|Application Support/gi);

    let title = "";
    if (desig && apex) {
      title = "Application for the post of Senior Oracle APEX Developer";
    } else if (apex) {
      title = "Application for the post of Oracle APEX Developer";
    } else if (desig && plsql) {
      title = "Application for the post of Senior PL/SQL Developer";
    } else if (plsql) {
      title = "Application for the post of PL/SQL Developer";
    } else if (desig && support) {
      title = "Application for the post of Application Support Analyst";
    }

    if (!title) {
      console.warn("No matching title for:", allText);
      return;
    }

    const mail = post.querySelector("a")
      ? post.querySelector("a").textContent.trim()
      : "";

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, mail }),
    })
      .then(res => res.json())
      .then(data => console.log("Sent:", data))
      .catch(err => console.error("Error:", err));
  });
}

scrapingJobPosts('tvm-parent-container')

