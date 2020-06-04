'use strict';

  // const templates = {
  //   articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  //   tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  //   //authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)

  // }

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}



// Module 6.4

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  cloudClassCount: '5',
  cloudClassPrefix: '.tag-size-',
  articleAuthorSelector: '.section-title .post-author',
  authorListSelector: '.post-author'
}


function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable articles */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);

  let html = '';

  /* for each article */
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //const linkHTMLData = {id: articleId, title: articleTitle};
    //const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();



// Module 7.2 and 7.3


function calculateTagsParams(tags){
  const params = {
    max:0,
    min:99999
  };
  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}


function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1 );
  return 'tag-size-' + classNumber;
}


function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      //const linkTagData = {id: tag, title: tag};
      //const linkTag = templates.tagLink(linkTagData);

      /* add generated code to html variable */
      html = html + linkTag  + ' ';
      //html = html + linkTag;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag  + '</a>(' + allTags[tag] + ')</li>';
    allTagsHTML += tagLinkHTML;

  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();


function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks){

    /* remove class active */
    tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  //const tagLinks = document.querySelectorAll(href);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){

  /* find all links to tags */
  const links = document.querySelectorAll('.tags a, .post-tags a');

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToTags();


function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let authorLink of authorLinks){

    /* remove class active */
    authorLink.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  //const authorLinks = document.querySelectorAll(href);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks){

    /* add class active */
    authorLink.classList.add('active');

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){
  console.log('test');

  /* find all links to author */
  const links = document.querySelectorAll('.author a');
  console.log('link', links);
  

  /* START LOOP: for each link */
  for(let link of links){

    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}



const calculateAuthorsParams = function(authors){
  console.log('tagsss',authors);
  const params = {'min':99999, 'max':0};

  for(let authorTag in authors){
    console.log(authorTag + ' is used ' + authors[authorTag] + ' times');
    params.max = authors[authorTag] > params.max ? authors[authorTag] : params.max;
    params.min = authors[authorTag] < params.min ? authors[authorTag] : params.min;
    }
    return params;
  }


const calculateAuthorsClass = function(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
  return opts.cloudClassPrefix + classNumber;
}


function generateAuthors(){

  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};
  //console.log('allauthors',allAuthors);

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  //console.log('Articles founds', articles);

    /* START LOOP: for every article: */
    for (let article of articles){

      /* find tags wrapper */
      const authorList = article.querySelector(opts.authorListSelector);
      //console.log('List author', authorList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleSurname = article.getAttribute('data-author');
      //console.log('Surname found:', articleSurname);

      /* split tags into array */
      const articleSurnameArray = articleSurname.split(' ');
      //console.log('Surnames were divided and boards were saved:', articleSurnameArray);

      /* START LOOP: for each tag */
      for (let author of articleSurnameArray){
      //console.log('I display each author separately:', author);

        /* generate HTML of the link */
        //const linkHTMLData = {id: authorTag, title: authorTag};
        //const linkHTML = templates.authorLink(linkHTMLData);
        const linkSurname = '<p><a  href="#author-' + author + '"><span>' + 'by ' + author + '</span></a></p>';
        console.log('Link html author', linkSurname);

        /* add generated code to html variable */
        html = html + linkSurname + ' ';
        //console.log('', html);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allAuthors[author]){
          /* [NEW] add tag to allTags object */
          allAuthors[author] = 1;
        } else {
          allAuthors[author]++;
        }

        /* END LOOP: for each tag */
        }

      /* insert HTML of all the links into the tags wrapper */
      authorList.innerHTML = html;

    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const surnameList = document.querySelector('.author');

    /* [NEW] create variable for all links HTML code */
    const authorsParams = calculateAuthorsParams(allAuthors);
    //console.log('AuthorsParams:', authorsParams);

    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let author in allAuthors){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      const authorLinkHTML = '<li><a class="' + calculateAuthorsClass(allAuthors[author], authorsParams) + '" href="#author-' + author + '">' + author  + '</a>(' + allAuthors[author] + ')</li>';
      allAuthorsHTML += authorLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    surnameList.innerHTML = allAuthorsHTML;
    //console.log('SurnameList inner', surnameList);
}
generateAuthors();
addClickListenersToAuthors();