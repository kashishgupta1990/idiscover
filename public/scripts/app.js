'use strict';

angular.module('confusionApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('login', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header1.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            .state('register', {
                url:'/register',
                views: {
                    'header': {
                        templateUrl : 'views/header1.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/register.html',
                        controller  : 'RegisterController'                  
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
        
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'                  
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            })
        
            // route for the dishdetail page
            .state('app.favorites', {
                url: 'favorites',
                views: {
                    'content@': {
                        templateUrl : 'views/favorites.html',
                        controller  : 'FavoriteController'
                   }
                }
            })
        
        
        
        
        .state('selecttype', {
                url:'/selecttype/',
                views: {
                    'header': {
                        templateUrl : 'views/header1.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/selecttype.html',
                        controller  : 'IController'  
                       
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
             })
        
        .state('secSelect', {
                url:'/sections',
                params: {a: null},
                views: {
                    'header': {
                        templateUrl : 'views/header1.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/secSelect.html',
                        controller  : 'IController'  
                   },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
             })
        .state('studentDashboard', {
                url:'/dashboard',
                views: {
                    'header': {
                        templateUrl : 'views/header1.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/studentDashboard.html',
                        controller  : 'userController'  
                   },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
             })
         .state('userProfile', {
                url:'/Profile',
                views: {
                    'header': {
                        templateUrl : 'views/header1.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/userProfile.html',
                        controller  : 'userController'  
                   },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
             })
        
         .state('userProfile.spec', {
                url: 'spec',
                views: {
                    'content@': {
                        templateUrl : 'views/spec.html',
                        controller  : 'userController'
                   }
                }
            })
        
         .state('selecttype.t1', {
                url: 't1',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t1.html',
                        controller  : 'IController'  
                   }
                }
            })
    
        .state('selecttype.t2', {
                url: 't2',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t2.html',
                        controller  : 'IController'  
                   }
                }
            })
        
         .state('selecttype.t3', {
                url: 't3',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t3.html',
                        controller  : 'IController'  
                   }
                }
            })
    
        .state('selecttype.t4', {
                url: 't4',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t4.html',
                        controller  : 'IController'  
                   }
                }
            })
        
         .state('selecttype.t5', {
                url: 't5',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t5.html',
                        controller  : 'IController'  
                   }
                }
            })
        
         .state('selecttype.t6', {
                url: 't6',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t6.html',
                        controller  : 'IController'  
                   }
                }
            })
        
         .state('selecttype.t7', {
                url: 't7',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t7.html',
                        controller  : 'IController'  
                   }
                }
            })
        
         .state('selecttype.t8', {
                url: 't8',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t8.html',
                        controller  : 'IController'  
                   }
                }
            })
        
         .state('selecttype.t9', {
                url: 't9',
                params: {a: null},
                views: {
                    'content@': {
                        templateUrl : 'views/t9.html',
                        controller  : 'IController'  
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
