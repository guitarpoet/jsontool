# The Shell Tool That I want to use for API manipulation

This is a small hobby project of mine. It will provides the function for two main categories: 

1. Provides a simple process framework that will use Rxjs requesting the JSON data from the remote server, and provides some operators to tweak with it.

The operators including:

* Filter or query the result using the [graph-ql](http://graphql.org/)
* Add the basic support for http header(http session) and so on, so that you can get logged in and start the processing with session, and don't have any problem for that.

2. Provides a better shell for operating it

* Provides the functions to load the init script(say, logging in and other things)
* Provides the function to call out your favorite editor for line editing in shell(Ctrl-X Ctrl-E), same as Bash/Zsh
* Provides the function that you can choose the pager as you want just by calling some embedded functions(and, since we can use stream for everything, the pager can be chained together too) 
    * The less pager: Which will work as less, so that you can view much more data within one page
    * The syntax colored pager: The result will be syntax colored and show in the colored terminal
    * The graph-ql pager: The result and be operated using the graph-ql(a graph-ql console), so that you can manipulate with the data with more flexibility
* Provides every function that node js can provides you, and will respect the node js load path too
