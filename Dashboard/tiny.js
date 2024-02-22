tinymce.init({
  selector:'textarea#default', 
  width:1000,
  height:300,
  Plugins:['advlist','autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak', 'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen','insertdatetime','media','table','emotions','template','codesample'],
  toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify|'+ 'bullist numlist outdent indent | link image | print preview media fullscreen' +'forecolor backcolor emoticons',
  menu:{
    favs:{title:'menu',items:'code visualaid | searchreplace | emoticons'}
  },
  menubar: 'favs file edit view insert format tools table', 
  content_style:'body{font-family:nunito,arial,sans-serif; font-size:16px}'
});