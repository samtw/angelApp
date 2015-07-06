app.controller('NewsCtrl', ['$state', '$scope', 'NewsClintService', '$rootScope', function ($state, $scope, NewsClintService, $rootScope) {


    $scope.vm = {};

    NewsClintService.getAll().then(function (data) {
        debugger;
        angular.forEach(data, function (item) {
            debugger;
            if (item.Image == null)
            {
                item.Image = "/App/img/newstitle.png";
            }

        });
        $scope.NewsList = data;
    });


    $scope.goToNewsDetail = function (data) {

        $rootScope.beClickedNewsDate = data;
        $state.go('app.newsDetail');
    }

    $scope.vm.goToDetail = function (data) {

        $rootScope.beClickedNewsDate = data;
        $state.go('app.newsDetail');
    }

   
}]);


app.controller('NewsDeatailCtrl', ['$state', '$scope', 'NewsClintService', '$rootScope','$sce', function ($state, $scope, NewsClintService, $rootScope,$sce) {

    $scope.ClickData = $rootScope.beClickedNewsDate;
    $scope.trustAsHtml = $sce.trustAsHtml;
    //$scope.ClickData = {};

    //if ($rootScope.beClickedNewsDate == 1) {
    //    $scope.ClickData.ArticleTitle = '[時事]12年國教';
    //    $scope.ClickData.ArticleContent = '12年國教去年第一年上路爭議不斷，現在傳出教育部研擬的「12年國教5年精進計畫」，計畫從105學年起，免試入學採計在校成績。對此。教育部長吳思華強調，目前只是專家小組工作圈的構想，尚未定案，如果真的採計，得另外修法，最快108學年實施。(陳映竹報導) 12年國教免試入學不採計在校成績，是因為各校標準不同，不過教育部研擬「12年國教5年精進計畫」，可能從105學年起，降低會考成績比例、恢復採計「在校領域成績」作比序之用。立法院司法教育聯席委員會中，民進黨立委黃國書及台聯黨立委賴振昌都關心，入學制度是否又有變革。 教育部長吳思華指出，這是工作圈的討論內容，目前沒有任何政策決定。如果要採計在校成績，修法後經過3年緩衝，最快108學年才能實施。 吳思華也強調，國中教育會考試作為學力監測，一定會存在，如果要改變高中職五專入學及分發方式，需要修改《高級中等教育法》，108學年「做不到完全不採計會考成績」。 爭議不斷的十二年國教現在傳出教育部正研擬草案，打算將免試入學採計會考成績比例大幅減少，預計108學年起可能將免試入學完全改成申請分發入學，不過部長吳思華也說目前還只是構想，要再討論。只是未來升學制度可能改變，也再度引發教育界不同看法。 去年十二年國教正式實施，各種升學制度引發不小爭議，現在傳出教育部打算研擬，從105學年度起減少免試入學採計會考成績的比例，最快108學年開始，更可能將免試入學完全改成申請分發入學。 教育部長吳思華表示：「主要的出發點都還是在於如何能夠落實免試入學這件事，如果要落實免試入學的話，可能就要有其他的採計方式，而不是用會考，所以專家才會提出這樣的一個意見。」教育部長澄清，高中職入學改採學生在校成績做申請分發，還只是初步想法，不過全國教師工會倒是贊成教育部這樣的改革方向。全國教師總工會理事長張旭政表示：「採計在校成績它比較能夠，促進教學正常化，基本上在學成績比較能夠呈現一個學生他的學習成果。」不過家長團體則質疑，如果不採計會考，全採用在校成績和其他志工服務超額比序項目，不一定每位學生都能獲得公平的競爭。新北市家長聯盟理事長蘇祐晟說：「如果他有一些特殊管道的家長，或是他運用很多特殊權勢，可以打通學校的各種管道的話，你說他的在校成績會差嗎？」 針對十二年國教升學制度可能變革，各團體出現不同看法，教育部強調草案內容還沒定案，如果要做任何變動，也必須經過修法，因此還需要一段時間與各界進行討論。';
    //} else if ($rootScope.beClickedNewsDate == 2) {
    //    $scope.ClickData.ArticleTitle = '[時事]12年國教';
    //    $scope.ClickData.ArticleContent = '104年度教育會考高雄考區6月5日放榜後,根據本班成績統計,成績達5個A,作文5級分以上篤定可以上雄中學女第一志願人數達5人,2個A和3個B等前三志願共計13人,前三志願升學率達57%';
    //}



}]);