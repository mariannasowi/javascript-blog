'use strict';


const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log(event)
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('Clicked selector is:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('Chosen article is:', targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('Active article is:', targetArticle);
}



// Module 6.4

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  cloudClassCount: '5',
  cloudClassPrefix: '.tag-size-',
  authorsListSelector: '.post-author'
}


function generateTitleLinks(customSelector = ''){
  console.log('Function generateTitleLinks has started');

  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  console.log('Tags found');
  titleList.innerHTML = '';
  console.log('Links cleared');

  /* find all the articles and save them to variable articles */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);

  let html = '';

  /* for each article */
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('Read attribute ID');

    /* find the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    console.log('Article title read');

    /* get the title from the title element */

    /* create HTML of the link */
    //const linkHTMLData = {id: articleId, title: articleTitle};
    //const linkHTML = templates.articleLink(linkHTMLData);

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
    titleList.innerHTML = html;
  }

  const links = document.querySelectorAll('.titles a');
  console.log(links);

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
  console.log('Articles found:', articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    //const tagsWrapper = article.querySelector(opts.articleTagsSelector);
    //console.log('Tag wrappers found:', tagWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('Tags found:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('Tags were divided and boards were saved:', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
    console.log('I display each tag separately:', tag);

      /* generate HTML of the link */
      //const linkHTMLData = {id: tag, title: tag};
      //const linkHTML = templates.tagLink(linkHTMLData);
      const linkTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkTag);

      /* add generated code to html variable */
      html = html + linkTag  + ' ';
      //html = html + linkHTML;
      console.log(html);

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
    //tagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag  + '</a>(' + allTags[tag] + ')</li>';
    allTagsHTML += tagLinkHTML;
    console.log('tagLinkHTML:', tagLinkHTML);
  }

  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log('taglist inner',tagList);
}
generateTags();



function tagClickHandler(event){
  console.log('Function tagClickHandler has started');

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Clicked tag href is:', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks){

    /* remove class active */
    tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  //const tagLinks = document.querySelectorAll(href);
  //console.log('target article', tagLinks);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');
    console.log('clickedElement:', tagLink);

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



const calculateAuthorsParams = function(authors){
  console.log('tagsss',authors);
  const params = {'min':99999, 'max':0};

  for(let authorTag in authors){
    console.log(authorTag + ' is used ' + authors[authorTag] + ' times');
    params.max = authors[authorTag] > params.max ? authors[authorTag] : params.max;
    params.min = authors[authorTag] < params.min ? authors[authorTag] : params.min;
    console.log('params',params);
    }
    return params;
  }


const calculateAuthorsClass = function(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
  console.log('klass author numer',classNumber);
  return opts.cloudClassPrefix + classNumber;
}


function generateAuthors(){

  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};
  console.log('allauthors',allAuthors);

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  console.log('artykuly znalezione', articles);

    /* START LOOP: for every article: */
    for (let article of articles){

      /* find tags wrapper */
      const authorList = article.querySelector(opts.authorListSelector);
      console.log('List tags', authorList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const authorTag = article.getAttribute('data-authors');
      console.log('Tag authors', authorTag);

      /* generate HTML of the link */
      //const linkHTMLData = {id: authorTag, title: authorTag};
      //const linkHTML = templates.authorLink(linkHTMLData);

      const linkHTML = '<p><a  href="#author-' + authorTag + '"><span>' + authorTag + '</span></a></p>';
      console.log('Link html author', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('', html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors[authorTag]){
        /* [NEW] add tag to allTags object */
        allAuthors[authorTag] = 1;
      } else {
        allAuthors[authorTag]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      authorList.innerHTML = html;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector('.authors');

    // authorList = tagList; .tags = .authors; tag = author;
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('AuthorsParams:', authorsParams);

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let authorTag in allAuthors){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      allAuthorsHTML += '<li><a class="' + calculateAuthorsClass(allAuthors[authorTag], authorsParams) + '" href="#author-' + authorTag  + '"><span>' + authorTag + '</span></a></li>';
      console.log('All authors tags html',allAuthorsHTML);

      /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML;
    console.log('authorlist inner',authorList);
    //tagList.innerHTML = allTagsHTML;
    //console.log('taglist inner',tagList);
}
generateAuthors();



function authorClickHandler(event){
  console.log('Function authorClickHandler has started');

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Clicked author href is:', href);

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each active author link */
  for (let authorLink of authorLinks){

    /* remove class active */
    authorList.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  //const authorLinks = document.querySelectorAll(href);
  //console.log('target article', authorLinks);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks){

    /* add class active */
    authorLink.classList.add('active');

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-authors="' + author + '"]');
}



function addClickListenersToAuthors(){

  /* find all links to author */
  const links = document.querySelectorAll('.author a, .post-author a');

  /* START LOOP: for each link */
  for(let link of links){

    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
