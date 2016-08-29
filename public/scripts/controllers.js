'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', function ($scope, menuFactory, favoriteFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    menuFactory.query(
        function (response) {
            $scope.dishes = response;
            $scope.showMenu = true;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(dishid) {
        console.log('Add to favorites', dishid);
        favoriteFactory.save({_id: dishid});
        $scope.showFavorites = !$scope.showFavorites;
    };
}])

.controller('ContactController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

    $scope.sendFeedback = function () {


        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
        } else {
            $scope.invalidChannelSelection = false;
            feedbackFactory.save($scope.feedback);
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
        }
    };
}])

.controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory', function ($scope, $state, $stateParams, menuFactory, commentFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.mycomment = {
        rating: 5,
        comment: ""
    };

    $scope.submitComment = function () {

        commentFactory.save({id: $stateParams.id}, $scope.mycomment);

        $state.go($state.current, {}, {reload: true});
        
        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: ""
        };
    }
}])

// implement the IndexController and About Controller here

.controller('HomeController', ['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory', function ($scope, menuFactory, corporateFactory, promotionFactory) {
    $scope.showDish = false;
    $scope.showLeader = false;
    $scope.showPromotion = false;
    $scope.message = "Loading ...";
    var leaders = corporateFactory.query({
            featured: "true"
        })
        .$promise.then(
            function (response) {
                var leaders = response;
                $scope.leader = leaders[0];
                $scope.showLeader = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    $scope.dish = menuFactory.query({
            featured: "true"
        })
        .$promise.then(
            function (response) {
                var dishes = response;
                $scope.dish = dishes[0];
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    var promotions = promotionFactory.query({
        featured: "true"
    })
    .$promise.then(
            function (response) {
                var promotions = response;
                $scope.promotion = promotions[0];
                $scope.showPromotion = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

    $scope.leaders = corporateFactory.query();

}])

.controller('FavoriteController', ['$scope', '$state', 'favoriteFactory', function ($scope, $state, favoriteFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showDelete = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    favoriteFactory.query(
        function (response) {
            $scope.dishes = response.dishes;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
           
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleDelete = function () {
        $scope.showDelete = !$scope.showDelete;
    };
    
    $scope.deleteFavorite = function(dishid) {
        console.log('Delete favorites', dishid);
        favoriteFactory.delete({id: dishid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', 'UserFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory, UserFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        $state.go('login', {});
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $state.go('login', {});
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        
       UserFactory.query(
                    function (response) {
                        $scope.abc = response;
                        if($scope.abc[0].type_selected == true)
                            $state.go('studentDashboard', {});
                            //$state.go('userProfile.spec', {});
                        else
                            $state.go('selecttype', {});
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    });       
            
        
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        //$state.go('selecttype', {});
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);
                
    };
            
    $scope.openRegister = function () {
        $state.go('register', {});     
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])

/*.controller('IController', ['$scope', '$state', '$stateParams', 'IFactory', 'UserFactory',function ($scope, $state,$stateParams,  IFactory, UserFactory) {
    

    $scope.showMenu = true;
    
    
    IFactory.query(function (response) {
            $scope.type_content = response;       

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        

    
   
    

    $scope.isSelected = function (checkTab) {
        return ($scope.tab == checkTab);
    };
     $scope.selectType={type_num:""};
    
     
    
      $scope.submitType = function () {
          UserFactory.type_num.update($scope.selectType);
   }               
           
}])*/







/*

.controller('IController', ['$scope', '$state', 'IFactory', function ($scope, $state, IFactory) {
    

    $scope.showMenu = true;
    
        IFactory.query(function (response) {
            $scope.type_content = response;       

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    
    $scope.select = function (setTab) {
        $scope.tab = 1;
        if($scope.tab == 1){
        IFactory.query(function (response) {
            $scope.type_content = response;       

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        $state.go('selecttype.t1', {});
        }
     };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab == checkTab);
    };
     $scope.selectType={typeno:""}
    
      $scope.submitType = function () {
   }
          
    
       
$state.go('selecttype.t2', {});           
              
  
}])*/

.controller('userController', ['$scope', '$state', 'UserFactory', function ($scope, $state, UserFactory) {
    
        UserFactory.query(
                    function (response) {
                        $scope.abc = response;
                        $scope.showMenu = true;           
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    });
    
    $scope.save={};
    
    $scope.isChecked = function(id){              
        var i=0,j=0,k=0;
        //$scope.abc[i].usertype[j].keywords[0].key_bool=true;
        
        if($scope.abc[i].type_selected == true){
            
            while(j< $scope.abc[i].usertype.length){
                k=0;
                while(k< $scope.abc[i].usertype[j].keywords.length){
                    
                    if($scope.abc[i].usertype[j].keywords[k]._id == id){
                        
                        if($scope.abc[i].usertype[j].keywords[k].key_bool == true){
                            $scope.abc[i].usertype[j].keywords[k].key_bool = false;
                            //return false;
                        }
                        else{
                            $scope.abc[i].usertype[j].keywords[k].key_bool = true;
                            //return true;
                        }                        
                    }
                    
                    k++;                    
                }
                
                j++;
            }
            
        $scope.save = {
        usertype: $scope.abc[i].usertype
        };
                    
        }        
    };     
    
    $scope.check = function(id){      
       var i=0,j=0,k=0;
        
       if($scope.abc[i].type_selected == true){
            
            while(j< $scope.abc[i].usertype.length){
                k=0;
                while(k< $scope.abc[i].usertype[j].keywords.length){
                    
                    if($scope.abc[i].usertype[j].keywords[k]._id == id){
                        
                        if($scope.abc[i].usertype[j].keywords[k].key_bool == true){
                            return true;
                        }
                        else{
                            return false;
                        }                        
                   }
                    
                    k++;                    
                }
                
                j++;
            }  
        }       
    };   
    
    
    $scope.secs = function(id){
       var i=0,j=0;
        
       if($scope.abc[i].type_selected == true){
            
            while(j< $scope.abc[i].usertype.length){              
                    
                    if($scope.abc[i].usertype[j]._id == id){
                        
                        if($scope.abc[i].usertype[j].type_bool == true){
                            return true;
                        }
                        else{
                            return false;
                        }                        
                   }                    
                  
                j++;
            } 
                   
        }      
    };
    
    var c=0;
    $scope.kshow = function(id){
       var i=0,j=0,k=0;
        
       if($scope.abc[i].type_selected == true){
            
            while(j< $scope.abc[i].usertype.length){
                k=0;
                while(k< $scope.abc[i].usertype[j].keywords.length){
                    
                    if($scope.abc[i].usertype[j].keywords[k]._id == id){
                        
                        if($scope.abc[i].usertype[j].keywords[k].to_edit == false){
                            
                            return true;
                        }
                        else{
                            
                            return false;
                        }                        
                   }
                    
                    k++;                    
                }
                
                j++;
            }  
        }
    }
    
    $scope.kedit = function(id){
        var i=0,j=0,k=0;
        
        if($scope.abc[i].type_selected == true){
            
            while(j< $scope.abc[i].usertype.length){
                k=0;
                while(k< $scope.abc[i].usertype[j].keywords.length){
                    
                    if($scope.abc[i].usertype[j].keywords[k]._id == id){
                        
                        if($scope.abc[i].usertype[j].keywords[k].to_edit == false){
                           $scope.abc[i].usertype[j].keywords[k].to_edit = true;
                        }
                        else{                            
                            $scope.abc[i].usertype[j].keywords[k].to_edit = false;              
                        }                      
                   }                    
                    k++;                    
                }                
                j++;
            }  
        }
    }
    
    $scope.submit = function () {                   
        var i=0,j=0,k=0;  
        
        if($scope.abc[i].type_selected == true){            
            while(j< $scope.abc[i].usertype.length){
                k=0;
                while(k< $scope.abc[i].usertype[j].keywords.length){           
                    $scope.abc[i].usertype[j].keywords[k].to_edit = false;             
                    k++;                    
                }                
                j++;
            }  
        }
        
        UserFactory.save($scope.save);
        $state.go('userProfile.spec', {});
        
    }
    
    $scope.secSave = function () {                   
        var i=0,j=0,k=0;  
        
        if($scope.abc[i].type_selected == true){            
            while(j< $scope.abc[i].usertype.length){
                k=0;
                while(k< $scope.abc[i].usertype[j].keywords.length){           
                    $scope.abc[i].usertype[j].keywords[k].to_edit = false;             
                    k++;                    
                }                
                j++;
            }  
        }
        
        UserFactory.save($scope.save);
      
        
    }
}])
 
.controller('IController', ['$scope', '$state', '$stateParams', 'IFactory', 'IFactory2', 'IFactory3', 'UserFactory', function ($scope, $state, $stateParams, IFactory, IFactory2, IFactory3, UserFactory) {
    
    $scope.showMenu = true;
    $scope.message = "Loading ...";
    $scope.t="0";
    $scope.q=$stateParams.a;
    $scope.type_content='';
    
    if($stateParams.a==1)
    {
        IFactory.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "1",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);         
       
            })
            .then(function onSuccess3(){
                UserFactory.query(
                    function (response) {
                        $scope.abc = response;
                        $scope.showMenu = true;           
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    })
            }); 
         
        /*IFactory.query(
        function (response) {
            $scope.type_content = response;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }); 
        
       UserFactory.query(
        function (response) {
            $scope.abc = response;
            $scope.showMenu = true;           
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });  
                
        $scope.saving = {
        firstname: "avinash",
        lastname: "sharma",
        type_num: "1",
        usertype: [{sec_name:"asdsa",keywords:[{keyword:"1st", description:"yeah"}]},{sec_name:"2"}]
     };   
        UserFactory.save($scope.saving);*/
    }
    
    else if($stateParams.a==2)
    {
        IFactory2.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "2",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);           
       
            })
            .then(function onSuccess3(){
                UserFactory.query(
                    function (response) {
                        $scope.abc = response;
                        $scope.showMenu = true;           
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    })
            });          
        
    }
    else if($stateParams.a==3)
    {
        IFactory3.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "3",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);          
       
            })
            .then(function onSuccess3(){
                UserFactory.query(
                    function (response) {
                        $scope.abc = response;
                        $scope.showMenu = true;           
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    })
            });         
        
    }
    else if($stateParams.a==4)
    {
        IFactory4.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "4",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);           
       
            })
            .then(function onSuccess3(){
                UserFactory.query(
                    function (response) {
                        $scope.abc = response;
                        $scope.showMenu = true;           
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    })
            }); ; 
    }
    else if($stateParams.a==5)
    {
        IFactory5.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "5",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);           
       
            }); 
    }
    else if($stateParams.a==6)
    {
        IFactory6.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "6",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);           
       
            }); 
    }
    else if($stateParams.a==7)
    {
        IFactory7.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "7",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);           
       
            }); 
    }
    else if($stateParams.a==8)
    {
        IFactory8.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "8",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);           
       
            }); 
    }
    else if($stateParams.a==9)
    {
        IFactory9.query()
            .$promise
            .then(function onSuccess(typeContent) {
                $scope.type_content = typeContent;
                $scope.showMenu = true;
                //return typeContent for chaining
                return typeContent;
            })
            .catch(function (errorResponse) {
                $scope.message = "Error: " + errorResponse.status + " " + errorResponse.statusText;
                //throw to chain errorResponse
                throw errorResponse;
            })
            .then(function onSuccess2(typeContent) {
                $scope.saving = {
                type_num: "9",
                type_selected: true,
                usertype: typeContent
                };   
                UserFactory.save($scope.saving);           
       
            }); 
    }
    
    
        
    $scope.select = function (setTab) {
        if(setTab == 1)
            $scope.t="1";
        else if(setTab == 2)
            $scope.t="2";
        else if(setTab == 3)
            $scope.t="3";
        else if(setTab == 4)
            $scope.t="4";
        else if(setTab == 5)
            $scope.t="5";
        else if(setTab == 6)
            $scope.t="6";
        else if(setTab == 7)
            $scope.t="7";
        else if(setTab == 8)
            $scope.t="8";
        else if(setTab == 9)
            $scope.t="9";        
    }    
    
    $scope.save={};
    
    $scope.sChecked = function(id){              
        var i=0,j=0;
        
       if($scope.abc[i].type_selected == true){
            
            while(j< $scope.abc[i].usertype.length){              
                    
                   if($scope.abc[i].usertype[j]._id == id){
                        
                        if($scope.abc[i].usertype[j].type_bool == true){
                            $scope.abc[i].usertype[j].type_bool = false;
                        }
                        else{
                            $scope.abc[i].usertype[j].type_bool = true;
                        }                        
                   }                    
                  
                j++;
            } 
                   
        }
            
        $scope.save = {
        usertype: $scope.abc[i].usertype
        };
                    
    };        
             
    $scope.sCheck = function(id){             
       var i=0,j=0;
        
       if($scope.abc[i].type_selected == true){
            
            while(j< $scope.abc[i].usertype.length){              
                    
                    if($scope.abc[i].usertype[j]._id == id){
                        
                        if($scope.abc[i].usertype[j].type_bool == true){
                            return true;
                        }
                        else{
                            return false;
                        }                        
                   }                    
                  
                j++;
            } 
                   
        }      
    };
        
    /*$scope.secCheck = function(id){              
       var i=0,j=0;
        
       if($scope.abc[i].type_selected == true){
            
            while(j< $scope.abc[i].usertype.length){              
                    
                    if($scope.abc[i].usertype[j]._id == id){
                        
                        if($scope.abc[i].usertype[j].type_bool == true){
                            $scope.abc[i].usertype[j].type_bool = false;
                        }
                        else{
                            $scope.abc[i].usertype[j].type_bool = true;
                        }                        
                   }                    
                  
                j++;
            } 
                   
        }       
    };       */
    
    $scope.submitsec = function () { 
        UserFactory.save($scope.save);
        $state.go('userProfile', {});
    }    
           
    $scope.submitType = function () {     
                
        //$state.go($state.current, {}, {reload: true});               
    
        if($scope.t=="1")                     
            $state.go('secSelect', {a:1});                          
        else if($scope.t=="2")
            $state.go('secSelect', {a:2});        
        else if($scope.t=="3")
            $state.go('secSelect', {a:3});      
        else if($scope.t=="4")
            $state.go('secSelect', {a:4});      
        else if($scope.t=="5")
            $state.go('secSelect', {a:5});      
        else if($scope.t=="6")
            $state.go('secSelect', {a:6});      
        else if($scope.t=="7")
            $state.go('secSelect', {a:7});      
        else if($scope.t=="8")
            $state.go('secSelect', {a:8});      
        else if($scope.t=="9")
            $state.go('secSelect', {a:9});
   }
    
}])

/*.controller('IController2', ['$scope', '$state', 'IFactory2', function ($scope, $state, IFactory2) {
    
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    IFactory2.query(
        function (response) {
            $scope.type_content = response;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });   
    
    $scope.isChecked = function(bl){               

        return true;
        
        };   
    
}])*/

;